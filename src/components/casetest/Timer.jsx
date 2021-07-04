import React from "react";
import {Button} from 'react-bootstrap';

export default function Timer(props){
    return <div style={{textAlign: 'center'}}>
      
    <div style={{fontSize: '100px'}}>
      <span>{props.minutes}</span>:<span>{props.seconds}</span>
    </div>
    <p>{props.isRunning ? 'Running' : 'Not running'}</p>
    <Button onClick={props.start}>Start</Button>
    <Button onClick={props.pause}>Pause</Button>
    <Button onClick={props.reset}>Reset</Button>
  </div>
}