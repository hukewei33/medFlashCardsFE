import React ,{ useState }from "react";
import background from "../img/bg.jpg";
import LocExams from "./LocExams";
import TestResult from "./TestResult";
import AllTested from "./AllTested";
import PatientInfo from "./PatientInfo";
import CheckAns from "./CheckAns";
import useFetch from "../fetchGet";



function CaseTest(props) {

  const [check, setCheck] = useState(false);
  const [cur,setCur] = useState(null);
  const [show, setShow] = useState(false);
  const [allTested, setAllTested] = useState({});

  //adds tested results into AllTested by catagory
  function addToAllTested(n){
    var key = n.result.medTest.testcat.name;
    if ((key in allTested)) {
      allTested[key].push(n);
    }
    else{
      setAllTested(pre => {return {...pre,[key]:[n]}});
    }
  }

  function handleClose(){setShow(false);}
  function handleShow(){setShow(true);}

  function checkAns(event){
    setCheck(true);
    event.preventDefault();
  }

  const url = "http://127.0.0.1:8000/api/caserand/?format=json";
  const { data, loading } = useFetch(url);

  if (data && allTested){
    const {gender,caseres_set,age,diagnosis} = data[0]
    //group each item by location in locDict
    var locDict = {};
    caseres_set.forEach(function (arrayItem) {
      var key = arrayItem.result.medTest.loc.name;
      //initalise as an array with locations coord in first 2 index and associated tests in index 2 
      if (!(key in locDict)) {locDict[key] = [arrayItem.result.medTest.loc.top,arrayItem.result.medTest.loc.left,[]];}
      var tmp = locDict[key][2];
      tmp.push(arrayItem);
    });

    
    return (
      <div > 
        {loading && (typeof data !== 'undefined')? <div>...loading</div> : 
         <div>
           <TestResult show = {show} handleClose = {handleClose} cur = {cur}/>

           <PatientInfo gender = {gender} age = {age}/>

           <AllTested allTested ={allTested} setCur = {setCur}  handleShow = {handleShow} check = {check}/>
            <div style={{position:"relative",backgroundImage: `url(${background})`,backgroundRepeat: "no-repeat", height: "500px",backgroundPosition:"center"   }}>
             
             {Object.keys(locDict).map(key=>
             <LocExams  area ={key} top = {locDict[key][0]} left = {locDict[key][1]} res = {locDict[key][2]}  setCur = {setCur} show = {show}  handleShow = {handleShow} addToAllTested = {addToAllTested} check = {check}/>)
             }
            </div>
           {/* <img className = "background" src={background} alt="background of man" ></img> */}

          
           
          <CheckAns checkAns = {checkAns} diagnosis = {diagnosis} check = {check} />
        
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

export default CaseTest;
