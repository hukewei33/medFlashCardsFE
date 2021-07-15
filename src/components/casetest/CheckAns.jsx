import React ,{useState}from "react";
import { Button,Form,Modal ,Table, ListGroup} from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";


function CheckAns(props){
  const [show, setShow] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { control, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    setDiagnosis(data.diagnosis);
    props.pause();
    handleShow();
  };


    return <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Form.Label>Your diagnosis</Form.Label>
    
    <Controller
      name="diagnosis"
      control={control}
      defaultValue=""
      render={({ field }) => <Form.Control as="textarea" rows={3} {...field}/>}
    />
    
    <Button variant="primary" type="submit">Submit</Button>
  </form>
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Correct diagnosis</th>
            <th>Your diagnosis</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.diagnosis}</td>
            <td>{diagnosis}</td>  
            <td>{props.minutes}:{props.seconds}</td> 
          </tr>
        </tbody>
      </Table>
      <p>Missed Tests</p>
      <ListGroup>
        {props.untested.filter(item=>(!item.req)).map(item=><ListGroup.Item>{item.result.name}<>❌</></ListGroup.Item>)}
      </ListGroup>
      <p>Conducted Tests</p>
      
        {Object.keys(props.allTested).map((key)=><><p>{key} Tests</p><ListGroup>  {props.allTested[key].map(item=><ListGroup.Item>{item.result.name}{item.req?<>✔️</>:<>❌</>}</ListGroup.Item>)}</ListGroup></>)}
      
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</>
}

export default CheckAns;