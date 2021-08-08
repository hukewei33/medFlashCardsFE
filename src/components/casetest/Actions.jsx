import React, { useState, useEffect } from "react";
import {Col, Card} from 'react-bootstrap';
import Untested from "./Untested1";

export default function Actions(props){
    const [locDict, setlocDict] = useState({});
    useEffect(() => {
        //sort res by loc
        const locDictNew = {}
        if (props.region && props.untested[props.region]){
          props.untested[props.region].forEach(function (arrayItem) {
              var key = arrayItem.finding.action.loc.name;
              //initalise as an empty array
              if (!(key in locDictNew)) {locDictNew[key] = [];}
              var tmp = locDictNew[key];
              tmp.push(arrayItem);
            });
        }
        
        setlocDict(locDictNew)
      },[props.untested,props.region]); // Only re-run the effect if props.untested changes

      
    if (props.region===null){
        return <Card>
        <Card.Body>No regions selected yet</Card.Body>
      </Card>
    }
    
 
    return <Card>
    <Card.Header  as="h3">{props.region} tests</Card.Header>
        <Card.Body>
            {Object.keys(locDict).length ===0?<>no actions left</>:Object.keys(locDict).map((key)=><Col><Untested locName = {key} res = {locDict[key]} doTest = {props.doTest} /></Col>)}    
        </Card.Body>
  </Card>
}