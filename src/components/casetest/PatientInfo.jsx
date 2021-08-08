import React from "react";
import { Card } from 'react-bootstrap';

function PatientInfo(props){
    return <Card >
    <Card.Title>Patient Info</Card.Title>
        <Card.Body>
            {/* <p>Case Name: {props.data.name} </p> */}
            <p>Gender: {props.data.gender}</p>
            <p>Age: {props.data.age}</p>
        </Card.Body>
    </Card>
}

export default PatientInfo