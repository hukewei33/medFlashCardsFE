import React from "react";
import { Button,Modal, Card } from 'react-bootstrap';
function TestResult(props) {
    
    
    return (
      props.cur ? <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.cur.result.medTest.name} result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Card >
            {props.cur.result.data&& <Card.Img variant="top" src={props.cur.result.data} /> }
           
            <Card.Body>
              {props.cur.result.audiodata && <audio controls src={props.cur.result.audiodata} > your browser does not support the audio elem</audio>}
              <Card.Text>             
                {props.cur.result.des && <>{props.cur.result.des}</>}
              </Card.Text>
            </Card.Body>
          </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </> : <></>
    );
    }
    
  

export default TestResult;