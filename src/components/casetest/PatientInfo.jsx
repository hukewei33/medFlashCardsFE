import React from "react";
import { Card } from 'react-bootstrap';

function PatientInfo(props){
    return <Card style={{ width: '100%' }}>
    <Card.Title>Patient Info</Card.Title>
        <Card.Body>
            <p>Case Name: {props.name} </p>
            <p>Gender: {props.gender}</p>
            <p>Age: {props.age}</p>
        </Card.Body>
    </Card>
}

export default PatientInfo