import React ,{ useState,useEffect }from "react";
import {Card,Form ,Button} from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
//import EditCaseResults from "./EditCaseResults";
import getCookie from "../getCookie";
import getURL from "../urlGetter" ;
import {  Redirect} from "react-router-dom";

export default function CreateNewCase(props){
      
    //const options = props.data.map(item=>{ return {value : item.id , label : item.name}});
    const { control, handleSubmit } = useForm();
    const [caseCreated,setCaseCreated] = useState(null)
    const [newId,setNewId] = useState(null)
    const genderOptions = [
      { value: "M", label: "Male" },
      { value: "F", label: "Female" }
    ];

    
    const [sysData,setData] =useState();
    useEffect(() => {
      const url = getURL()+"/api/systems/?format=json";
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          //console.log(json);
          const newData = json.map(item=>{ return {value : item.id , label : item.name}});
          //console.log(newData);
          setData(newData);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();
  }, []);

    const onSubmit = data => {
      console.log(data);
      if (props.default ===null){
        data.system = data.system.value;
      }
      data.gender = data.gender.value;
      
      var csrftoken = getCookie('csrftoken')
      const urlTail = props.default ? "/api/caseupdate/"+String(props.default.id)+"/" :'/api/case-create/'
      var url = getURL()+urlTail
      // var url = 'http://127.0.0.1:8000/api/case-create/'

      const httpMethod = props.default ? 'PATCH':'POST';
      fetch(url, {
        method:httpMethod,
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
          'Authorization': "Token "+String(props.token)
        },
        body:JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCaseCreated(data.id);
        console.log(caseCreated);
        if(props.default ===null && data.id){
          setNewId("/caseedit/"+String(data.id)+"/");
        }
        if(props.default && data.id){
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    };
    
    
    
    return newId? <Redirect to={newId}/>: <div className="App">
    <Card body >
    <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Create a New Case</h1>
    <Form.Label>Case Name</Form.Label>
      <Controller
        name="name"
        control={control}
        defaultValue={props.default? props.default.name : ""}
        render={({ field }) => <Form.Control type="text" placeholder="case name" {...field} />}
      />
    <Form.Label>Diagnosis</Form.Label>
      <Controller
        name="diagnosis"
        control={control}
        defaultValue={props.default? props.default.diagnosis : ""}
        render={({ field }) => <Form.Control type="text" placeholder=" enter diagnosis" {...field}/>}
      /> 
    <Form.Label>Age</Form.Label>
      <Controller
        name="age"
        control={control}
        defaultValue={props.default? props.default.age : ""}
        render={({ field }) => <Form.Control type="number" min = "0" placeholder=" enter age" {...field}/>}
      /> 

    <Form.Label>Gender</Form.Label>
    <Controller
        name="gender"
        control={control}
        defaultValue = {(props.default && props.default.gender ==="M")?genderOptions[0]:genderOptions[1] }
        render={({ field }) => <Select 
          {...field} 
          options={genderOptions} 
          defaultValue = {(props.default && props.default ==="M")?genderOptions[0]:genderOptions[1] }
        />}
      />
      {(props.default===null) && <><Form.Label>System</Form.Label>
      <Controller
        name="system"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={sysData} 
        />}
      /></>}
      <Button variant="primary" type="submit">{props.default?"update case":"create case"}</Button>
      {/* {caseCreated?<> case {caseCreated} created. please edit case findings, maybe also add a delete case here?</>: <input type="submit" />} */}
    </form>
    </Card>
    {/* after new case is created, we want to edit all associated caseres, called with caseid of newly created case */}
    {/* {caseCreated && <EditCaseResults caseId = {caseCreated}/>} */}
    
  </div>
}
//export default SelectExamType;