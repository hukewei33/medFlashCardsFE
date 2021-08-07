import React, { useState, useEffect } from "react";
import { Button,OverlayTrigger,Popover,Row,Col, Container} from 'react-bootstrap';
import Untested from "./Untested1";

export default function LocExams (props){
  // const [locDict, setlocDict] = useState({});
  // useEffect(() => {
  //   //sort res by loc
  //   const locDictNew = {}
  //   props.res.forEach(function (arrayItem) {
  //     var key = arrayItem.finding.action.loc.name;
  //     //initalise as an empty array
  //     if (!(key in locDictNew)) {locDictNew[key] = [];}
  //     var tmp = locDictNew[key];
  //     tmp.push(arrayItem);
  //   });
  //   setlocDict(locDictNew)
  // },[props.res]); // Only re-run the effect if props.res changes

  function handleClick(){
    //props.setCurActions(locDict)
    props.setCurRegion(props.region)
  }

  if(props.res.length===0){
    return<></>
  }

    // const popover = (
    //   <Popover id="popover-basic">
    //     <Popover.Header  as="h3">{props.region} tests</Popover.Header>
    //     <Popover.Body>
    //     {/* <Container>
    //       <Row xs={1} md={3} > */}
    //         {Object.keys(locDict).map((key)=><Col><Untested locName = {key} res = {locDict[key]} doTest = {props.doTest} /></Col>)}  
    //       {/* </Row>
    //       </Container> */}
    //     </Popover.Body>
    //   </Popover>
    // );
    
    return <div style = {{position:"absolute", top :`${props.top}px`,left :`${props.left}px`}}>
    {/* <OverlayTrigger trigger={['click']}  placement="right" overlay={popover} > */}
      <Button className="btn bg-transparent" onClick = {handleClick}></Button> 
    {/* </OverlayTrigger> */}
  </div>
    
}
