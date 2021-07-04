import React from "react";
import { Card,Accordion } from 'react-bootstrap';
import CatExams from "./CatExams";


function AllTested(props){
    
    //console.log(props.allTested);
    return <Card style={{ width: '18rem' }}>
        <Card.Header>Completed Tests</Card.Header>
        <Card.Body>
        <Accordion>
        
            {Object.keys(props.allTested).map((key,index)=><CatExams  name = {key} exams = {props.allTested[key]} index = {index} setCur = {props.setCur}  handleShow = {props.handleShow} /> ) }
            
        </Accordion>
        </Card.Body>
    </Card>
} 

export default AllTested;