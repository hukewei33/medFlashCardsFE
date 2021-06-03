import React ,{ useState}from "react";
import { Button,Modal } from 'react-bootstrap';
function TestResult(props) {
    
    
    return (
      props.cur ? <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.cur.img.medTest.name} result</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.cur.img.data}</Modal.Body>
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