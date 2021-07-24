import React from "react";
import {Button} from 'react-bootstrap';

export default function Timer(props){
    return <div style={{textAlign: 'center'}}>
      
    <div style={{fontSize: '50px'}}>
      <span>{props.minutes}</span>:<span>{props.seconds} <Button onClick={props.start}>Start</Button>
    <Button onClick={props.reset}>Reset</Button></span>
    </div>
    <p>{props.isRunning ? 'Running' : 'Not running'}</p>
   
  </div>
}