import React from "react";
import { Button,Modal, Card } from 'react-bootstrap';

function TestResult(props) {
    
    return (
      props.cur ? <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.cur.finding.action.name} finding</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Card >
            {props.cur.finding.data&& <Card.Img variant="top" src={props.cur.finding.data} /> }
           
            <Card.Body>
              {props.cur.finding.audiodata && <audio controls src={props.cur.finding.audiodata} > your browser does not support the audio elem</audio>}
              <Card.Text>             
                {props.cur.finding.des && <>{props.cur.finding.des}</>}
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