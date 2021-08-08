import React ,{ useState,useEffect }from "react";
import Background from "../img/bg1.png";
import LocExams from "./LocExams";
//import TestResult from "./TestResult";
import AllTested from "./AllTested";
import PatientInfo from "./PatientInfo";
import CheckAns from "./CheckAns";
import MyStopwatch from "./Timer";
import { Container,Row,Col} from 'react-bootstrap';
import { useStopwatch } from 'react-timer-hook';
import getURL from "../urlGetter";
import ShowFinding from "./ShowFinding";
import Actions from "./Actions";


export default function CaseTest(props) {

  const [cur,setCur] = useState(null);
  const [allTested, setAllTested] = useState({});
  //const [curActions,setCurActions]=useState(null);
  const [curRegion,setCurRegion]= useState(null);
  const {seconds, minutes,isRunning,start,pause,reset,} = useStopwatch({ autoStart: true });
  const REGIONS = {"head":[90,238],"neck":[200,238],"left upper limb":[300,150] ,"right upper limb":[300,325] ,"back":[250,275],"left chest":[260,200],"right chest":[260,280],"perineum":[275,400],"abdomen":[300,300],"left lower limb":[780,180],"right lower limb":[780,300]};
  
  
  //get data from API
  const [paitentInfo,setPaientInfo] = useState(null);
  const [untested, setUntested] = useState(null);
  useEffect(() => {
    //if the param is 0  then we use a random test, else we use it as a case id
    var url = getURL()+"/api/caserand/?format=json";
    if (props.testid !== "0"){
      url = getURL()+"/api/case-detail/"+props.testid+"/?format=json";
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        const {gender,age,diagnosis,name,caseres_set} = json
        setPaientInfo({gender:gender,age:age,diagnosis:diagnosis,name:name})
         //get a set of all action ids for case
        const actionIdSet = new Set()
        caseres_set.forEach(function(arrayItem){actionIdSet.add(arrayItem.finding.action.id)})
        //get a copy of all default findings from session storage
        const defFindingsAll = props.defData;
        
        //use set to filter findings which already exist in caseres_set
        const defFindings = defFindingsAll.filter(item => ! (actionIdSet.has(item.action.id )))
        //init requried test
        caseres_set.forEach(element=> element.req=true)
        //append to other default findings to caseres_set
        const defFindingsWithRes = defFindings.map(function(item){return {req:false,finding:item}})
        caseres_set.push(...defFindingsWithRes);

        //group each item by location in regionDict
        var regionDict = {};
        caseres_set.forEach(function (arrayItem) {
          var key = arrayItem.finding.action.loc.region;
          //initalise as an empty array 
          if (!(key in regionDict)) {regionDict[key] = [];}
          var tmp = regionDict[key];
          tmp.push(arrayItem);
        });
        setUntested(regionDict);
        console.log(regionDict)

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log(props.defData);

  }, [props.defData,props.testid]);

  
  //adds tested results into AllTested by catagory
  function addToAllTested(n){
    var key = n.finding.action.loc.region;
    if ((key in allTested)) {
      allTested[key].push(n);
    }
    else{
      setAllTested(pre => {return {...pre,[key]:[n]}});
    }
  }

  if (untested && allTested){
  
    //once a test is done, move that test into tested and remove it from data, also set that test to cur for viewing
    function doTest(test){
      // var newCur = (data.caseres_set.filter(item=>item.finding.id === test.finding.id))[0];
      const testRegion = test.finding.action.loc.region
      const target = untested[testRegion].filter(item=>item.finding.id !== test.finding.id)
      console.log(target)
      //var newUntested = data.caseres_set.filter(item=>item.finding.id !== test.finding.id);
      setCur(test);
      addToAllTested(test);
      setUntested(pre=>{return{...pre,[testRegion]:target}})
      console.log(untested)
      //setTestData(pre=>{return {...pre,"caseres_set":newUntested}})
      //console.log(data);
      //handleShow();
    }
    
    return (
      <Container fluid> 
        {/* <TestResult show = {show} handleClose = {handleClose} cur = {cur}/> */}
        <Row>
          <Col>
            <div style={{position:"relative",backgroundImage: `url(${Background})`,backgroundRepeat: "no-repeat", height: "1000px",backgroundPosition:"left top"   }}>             
              {Object.keys(REGIONS).map(key=>
                <LocExams  region ={key} top = {REGIONS[key][0]} left = {REGIONS[key][1]} res = {untested[key]?untested[key]:[]}  setCurRegion = {setCurRegion}/>)
              }
            </div> 
          </Col>
          <Col sm ={3}>
          <ShowFinding cur = {cur}/>
          <Actions untested = {untested} region = {curRegion} doTest = {doTest}/>
          </Col>
          <Col sm ={3}>
          <MyStopwatch seconds={seconds} minutes = {minutes} isRunning ={isRunning }start = {start} pause={pause} reset = {reset}/>
          <PatientInfo data = {paitentInfo}/> 
            <AllTested allTested ={allTested} setCur = {setCur}  />
            <CheckAns allTested = {allTested} diagnosis = {paitentInfo.diagnosis}  untested = {untested} minutes = {minutes } seconds = {seconds} pause = {pause}/>
          </Col>
        </Row>  
      </Container>
     );
  }
  return <div > ...loading</div> ;
}