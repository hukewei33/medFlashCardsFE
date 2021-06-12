import React from "react";
import { Button,Container,Row,Col,Card,Form } from 'react-bootstrap';

function CheckAns(props){
    return <Form>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Your Answer</Form.Label>
      <Form.Control as="textarea" rows={3} />
    </Form.Group>
    <Row>
      <Col>
        <Button variant="primary" onClick = {props.checkAns} >Check Answer</Button>
      </Col>
      <Col>
        <Form.Text >
          correct diagnosis :{props.check && <div>{props.diagnosis}</div> }  
        </Form.Text>
      </Col>
    </Row>
  </Form>
}

export default CheckAns;