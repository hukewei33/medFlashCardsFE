import React from "react";
import { Card } from 'react-bootstrap';

function PatientInfo(props){
    return <Card>
    <Card.Title>Patient Info</Card.Title>
    <Card.Body>Gender: {props.gender} </Card.Body>
    <Card.Body>Age: {props.age}</Card.Body>
    </Card>
}

export default PatientInfo