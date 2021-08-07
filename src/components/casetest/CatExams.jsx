import React from "react";
import { ListGroup,Accordion } from 'react-bootstrap';

function CatExams(props){
  function clickedRes(res){
    props.setCur(res);
}
return <Accordion.Item eventKey={props.index.toString()}>
        <Accordion.Header>{props.name}</Accordion.Header>
        <Accordion.Body>
        <ListGroup>
                   {props.exams.map(item=><ListGroup.Item onClick={()=>clickedRes(item)} action >
                     {item.finding.action.name}
                     </ListGroup.Item>)}
                 
                </ListGroup>
        </Accordion.Body>
        </Accordion.Item>

    // return <Card>
    //             <Card.Header>
    //             <Accordion.Toggle as={Button} variant="link" eventKey={props.index.toString()}>
    //             {props.name}
    //             </Accordion.Toggle>
    //             </Card.Header>
    //             <Accordion.Collapse eventKey={props.index.toString()}>
    //             <Card.Body>
    //             <ListGroup>
    //               {props.exams.map(item=><ListGroup.Item onClick={()=>clickedRes(item)} action >
    //                 {item.finding.action.name}
    //                 </ListGroup.Item>)}
                 
    //             </ListGroup>
                  
    //               </Card.Body>
    //             </Accordion.Collapse>
    //   </Card>
}

export default CatExams;