import React ,{ useState }from "react";
import background from "../img/bg.jpg";
import LocExams from "./LocExams";
import TestResult from "./TestResult";
import AllTested from "./AllTested";
import PatientInfo from "./PatientInfo";
import CheckAns from "./CheckAns";
import useFetch from "../fetchGet";
import MyStopwatch from "./Timer";
import { Container,Row,Col} from 'react-bootstrap';
import { useStopwatch } from 'react-timer-hook';


export default function CaseTest(props) {

  const [cur,setCur] = useState(null);
  const [allTested, setAllTested] = useState({});
  const {seconds, minutes,isRunning,start,pause,reset,} = useStopwatch({ autoStart: true });
  const REGIONS = {"head":[25,375],"forearm":[200,275] ,"palm":[250,275],"chest":[100,375],"pelvis":[275,400],"legs":[400,375]};
  //if the param is 0  then we use a random test, else we use it as a case id
  var url = "http://127.0.0.1:8000/api/caserand/?format=json";
  if (props.testid !== "0"){
    url = "http://127.0.0.1:8000/api/case-detail/"+props.testid+"/?format=json";
  }
  const { data, loading ,setData} = useFetch(url);

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
  //Modal funcitonality
  const [show, setShow] = useState(false);
  function handleClose(){setShow(false);}
  function handleShow(){setShow(true);}

  // //check answer funcitionality 
  // const [check, setCheck] = useState(false);
  // function checkAns(event){
  //   setCheck(true);
  //   event.preventDefault();
  // }

  if (data && allTested){
    const {gender,age,diagnosis,name} = data
    //group each item by location in regionDict
    var regionDict = {};
    data.caseres_set.forEach(function (arrayItem) {
      var key = arrayItem.result.medTest.loc.region;
      //initalise as an empty array 
      if (!(key in regionDict)) {regionDict[key] = [];}
      var tmp = regionDict[key];
      tmp.push(arrayItem);
    });

    //once a test is done, move that test into tested and remove it from data, also set that test to cur for viewing
    function doTest(test){
      var newCur = (data.caseres_set.filter(item=>item.id === test.id))[0];
      var newUntested = data.caseres_set.filter(item=>item.id !== test.id);
      setCur(newCur);
      addToAllTested(newCur);
      setData(pre=>{return {...pre,"caseres_set":newUntested}})
      //console.log(data);
      handleShow();
    }
    
    return (
      <Container fluid> 
        <TestResult show = {show} handleClose = {handleClose} cur = {cur}/>
        <Row>
          <Col><PatientInfo gender = {gender} age = {age} name = {name}/> </Col>
          <Col>
            <MyStopwatch seconds={seconds} minutes = {minutes} isRunning ={isRunning }start = {start} pause={pause} reset = {reset}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{position:"relative",backgroundImage: `url(${background})`,backgroundRepeat: "no-repeat", height: "500px",backgroundPosition:"center"   }}>             
              {Object.keys(REGIONS).map(key=>
                <LocExams  region ={key} top = {REGIONS[key][0]} left = {REGIONS[key][1]} res = {regionDict[key]?regionDict[key]:[]}  setCur = {setCur} show = {show}  handleShow = {handleShow} addToAllTested = {addToAllTested}  doTest = {doTest}/>)
              }
            </div> 
          </Col>
          <Col sm ={4}>
            <AllTested allTested ={allTested} setCur = {setCur}  handleShow = {handleShow} />
            <CheckAns allTested = {allTested} diagnosis = {diagnosis}  untested = {data.caseres_set} minutes = {minutes } seconds = {seconds} pause = {pause}/>
          </Col>
        </Row>  
      </Container>
     );
  }
  return <div > ...loading</div> ;
}