import React ,{ useState }from "react";
import {Card,Form } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import EditCaseResults from "./EditCaseResults";
import getCookie from "../getCookie";
import getURL from "../urlGetter" ;

export default function CreateNewCase(props){
      
    const options = props.data.map(item=>{ return {value : item.id , label : item.name}});
    const { control, handleSubmit } = useForm();
    const [caseCreated,setCaseCreated] = useState(null)

    const onSubmit = data => {
      data.examtype = data.examtype.value;
      data.gender = data.gender.value;
      console.log(data);
      var csrftoken = getCookie('csrftoken')
      var url = getURL()+'/api/case-create/'
      var url = 'http://127.0.0.1:8000/api/case-create/'

      fetch(url, {
        method:'POST',
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    };
    
    
    
    return <div className="App">
    <Card body >
    <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Create a New Case</h1>
    <Form.Label>Case Name</Form.Label>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <Form.Control type="text" placeholder="case name" {...field} />}
      />
    <Form.Label>Diagnosis</Form.Label>
      <Controller
        name="diagnosis"
        control={control}
        defaultValue=""
        render={({ field }) => <Form.Control type="text" placeholder=" enter diagnosis" {...field}/>}
      /> 
    <Form.Label>Age</Form.Label>
      <Controller
        name="age"
        control={control}
        defaultValue=""
        render={({ field }) => <Form.Control type="number" min = "0" placeholder=" enter age" {...field}/>}
      /> 

    <Form.Label>Gender</Form.Label>
    <Controller
        name="gender"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={[
            { value: "M", label: "Male" },
            { value: "F", label: "Female" }
          ]} 
        />}
      />
      <Form.Label>Exam Type</Form.Label>
      <Controller
        name="examtype"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={options} 
        />}
      />
      {caseCreated?<> case {caseCreated} created. please edit case findings, maybe also add a delete case here?</>: <input type="submit" />}
    </form>
    </Card>
    {/* after new case is created, we want to edit all associated caseres, called with caseid of newly created case */}
    {caseCreated && <EditCaseResults caseId = {caseCreated}/>}
    
  </div>
}
//export default SelectExamType;