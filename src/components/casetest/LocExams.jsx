import React ,{ useState}from "react";
import { Button,Card,Accordion,Form } from 'react-bootstrap';
import Tested from "./Tested";
import Untested from "./Untested";

function LocExams (props){
    const [untested, SetUntested] = useState(props.res); 
    const [tested,setTested] = useState([]);
    const [value, setValue] = useState(props.res[0].id);
    const [inFocus,setInFocus] = useState("2");


    function doTest(event){
      var newCur = (untested.filter(item=>item.id == value))[0];
      var newUntested = untested.filter(item=>item.id != value);
      setTested(prevTested => [...prevTested,newCur]);
      props.setCur(newCur);
      SetUntested(newUntested);
      props.addToAllTested(newCur);
      if (newUntested.length >0){setValue(newUntested[0].id);}
      props.handleShow();
      event.preventDefault();
    }

    function mOver(){
      setInFocus("3");
    }
    function mOut(){
      setInFocus("2");
    }




    return <div onMouseOver = {mOver} onMouseOut= {mOut} style = {{position:"absolute", top :`${props.top}px`,left :`${props.left}px`, zIndex:`${inFocus}`}}>
  
      <Accordion>
        <Card style={{ width: '18rem' }}>
          
          <Card.Header>

            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {props.area} tests
            </Accordion.Toggle>
            
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            
            <Card.Body>

            <Accordion defaultActiveKey="3">
              
              <Tested tested = {tested} setCur = {props.setCur} handleShow = {props.handleShow}/>

              <Untested untested = {untested} value = {value} setValue = {setValue} doTest = {doTest}/>

            </Accordion>

            </Card.Body>

          </Accordion.Collapse>

        </Card>
      </Accordion>

    </div>      
    
}

export default LocExams;