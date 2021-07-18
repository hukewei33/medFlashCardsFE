import React from "react";
import { Button,OverlayTrigger,Popover } from 'react-bootstrap';
import Untested from "./Untested1";

export default function LocExams (props){
  

  if(props.res.length===0){
    return<></>
  }

    //sort res by loc
    const locDict = {}
    props.res.forEach(function (arrayItem) {
      var key = arrayItem.finding.action.loc.name;
      //initalise as an empty array
      if (!(key in locDict)) {locDict[key] = [];}
      var tmp = locDict[key];
      tmp.push(arrayItem);
    });

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{props.region} tests</Popover.Title>
        <Popover.Content>
          {Object.keys(locDict).map((key)=><Untested locName = {key} res = {locDict[key]} doTest = {props.doTest} />)}
        </Popover.Content>
      </Popover>
    );
    
    return <div style = {{position:"absolute", top :`${props.top}px`,left :`${props.left}px`}}>
    <OverlayTrigger trigger={['click','foccus']}  placement="right" overlay={popover} >
      <Button className="btn bg-transparent">{props.region}</Button> 
    </OverlayTrigger>
  </div>
    
}
