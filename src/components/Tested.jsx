import React from "react";
import { Card,Accordion,Button,ListGroup  } from 'react-bootstrap';

function Tested(props){
    function clickedRes(res){
        props.setCur(res);
        props.handleShow();
    }

return (
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Performed tests results
            </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
        <Card.Body>{props.tested.length>0 ? 
        <div>
            <ListGroup defaultActiveKey="#link1">
                {props.tested.map(item => (<ListGroup.Item onClick={()=>clickedRes(item) } >{item.img.medTest.name} </ListGroup.Item>)) }                
            </ListGroup> 
        </div>
        
        : <p>No test performed </p>} </Card.Body>
        </Accordion.Collapse>
    </Card>);
}

export default Tested;