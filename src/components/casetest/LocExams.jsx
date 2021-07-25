import React, { useState, useEffect } from "react";
import { Button,OverlayTrigger,Popover } from 'react-bootstrap';
import Untested from "./Untested1";

export default function LocExams (props){
  const [locDict, setlocDict] = useState({});
  useEffect(() => {
    //sort res by loc
    const locDictNew = {}
    props.res.forEach(function (arrayItem) {
      var key = arrayItem.finding.action.loc.name;
      //initalise as an empty array
      if (!(key in locDictNew)) {locDictNew[key] = [];}
      var tmp = locDictNew[key];
      tmp.push(arrayItem);
    });
    setlocDict(locDictNew)
  },[props.res]); // Only re-run the effect if props.res changes

  if(props.res.length===0){
    return<></>
  }

    const popover = (
      <Popover id="popover-basic">
        <Popover.Header  as="h3">{props.region} tests</Popover.Header>
        
        <Popover.Body>
          {Object.keys(locDict).map((key)=><Untested locName = {key} res = {locDict[key]} doTest = {props.doTest} />)}
        </Popover.Body>
      </Popover>
    );
    
    return <div style = {{position:"absolute", top :`${props.top}px`,left :`${props.left}px`}}>
    <OverlayTrigger trigger={['click','foccus']}  placement="right" overlay={popover} >
      <Button className="btn bg-transparent">{props.region}</Button> 
    </OverlayTrigger>
  </div>
    
}
