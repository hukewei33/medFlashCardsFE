import React ,{ useState}from "react";
import { Button,Container,Row,Col,Card,ListGroup,Accordion } from 'react-bootstrap';

function CatExams(props){
  function clickedRes(res){
    props.setCur(res);
    props.handleShow();
}

    return <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={props.index.toString()}>
                {props.name}
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.index.toString()}>
                <Card.Body>
                <ListGroup>
                  {props.exams.map(item=><ListGroup.Item onClick={()=>clickedRes(item)} action variant={props.check ? (item.req?"success":"danger") : "primary" }>
                    {item.result.medTest.name}
                    </ListGroup.Item>)}
                 
                </ListGroup>
                  
                  </Card.Body>
                </Accordion.Collapse>
      </Card>
}

export default CatExams;