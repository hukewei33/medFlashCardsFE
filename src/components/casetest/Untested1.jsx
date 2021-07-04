import React from "react";
import { DropdownButton,Dropdown } from 'react-bootstrap';

export default function Untested1(props){
    
    return <DropdownButton id="dropdown-basic-button" title={props.locName}>
    {props.res.map((testRes,index)=><Dropdown.Item eventKey= {String(index)} onClick = {()=>props.doTest(testRes)}>{testRes.result.medTest.name}</Dropdown.Item> )}
  </DropdownButton>

}