import React from "react";
import { Button,Container,Row,Col,Card } from 'react-bootstrap';


function AllTested(props){
    console.log(props.allTested);
    return <Card style={{ width: '18rem' }}>
        <Card.Header>Completed Tests</Card.Header>
        <Card.Body>
        {Object.keys(props.allTested).map(key=> <div>{key}</div>) }
        
        </Card.Body>
    </Card>
} 

export default AllTested;