import React from "react";
import { Button,Card,Accordion,Form } from 'react-bootstrap';

function Untested(props){

    return <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="3">
        Test options
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body>
      
      {props.untested.length >0 ? <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
        <select
            value={props.value}
            onChange={e => props.setValue(e.currentTarget.value)}
        >
        { props.untested.map(item => (
          <option key={item.id} value={item.id}>
            {item.result.medTest.name}
          </option>
        ))}
        </select>
        <Button variant="primary" onClick ={props.doTest}>Do Test</Button>
        </Form.Group>
      </Form> : <> all test performed</>}
      </Card.Body>
    </Accordion.Collapse>
  </Card>
}

export default Untested;