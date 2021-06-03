import React ,{ useState, useEffect }from "react";
import background from "./img/bg.jpg";
import LocExams from "./LocExams";
import TestResult from "./TestResult";
import AllTested from "./AllTested";
import { Button,Container,Row,Col,Card } from 'react-bootstrap';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  }, []);

  return { data, loading };
};


function Cards(props) {

  const [check, setCheck] = useState(false);
  const [cur,setCur] = useState(null);
  const [show, setShow] = useState(false);
  const [allTested, setAllTested] = useState({});

  function addToAllTested(n){
    var key = n.img.medTest.testcat.name;
    if ((key in allTested)) {
      allTested[key].push(n);
    }
    else{
      setAllTested(pre => {return {...pre,[key]:[n]}});
    }
    console.log(allTested);
  }

  function handleClose(){setShow(false);}
  function handleShow(){setShow(true);}

  function checkAns(event){
    setCheck(!check);
    event.preventDefault();
  }

  const url = "http://127.0.0.1:8000/api/caserand/?format=json";
  const { data, loading } = useFetch(url);

  if (data && allTested){
    const {gender,caseimg_set,age} = data[0]
    //group each item by location in locDict
    var locDict = {};
    caseimg_set.forEach(function (arrayItem) {
      var key = arrayItem.img.medTest.loc.name;
      //initalise as empty array
      if (!(key in locDict)) {locDict[key] =[];}
      var tmp = locDict[key];
      tmp.push(arrayItem);
    });

    
    return (
      <div > 
        {loading && (typeof data !== 'undefined')? <div>...loading</div> : 
         <div>
           <TestResult show = {show} handleClose = {handleClose} cur = {cur}/>
           <Card>
           <Card.Title>Patient Info</Card.Title>
           <Card.Body>Gender: {gender} </Card.Body>
           <Card.Body>Age: {age}</Card.Body>
           </Card>
           <AllTested allTested ={allTested}/>
           <img className = "background" src={background} alt="background of man" ></img>
           {Object.keys(locDict).map(key=><LocExams area ={key} res = {locDict[key]} cur = {cur}  setCur = {setCur} show = {show} handleClose = {handleClose} handleShow = {handleShow} addToAllTested = {addToAllTested}/>)}
           
         </div>  
       }
      </div>
     );
  }
  return (
   <div > ...loading
   </div>
  );
}

export default Cards;
