import React ,{ useState,useEffect }from "react";
import {Card,Form ,Button} from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import EditCaseResults from "./EditCaseResults";
import getCookie from "../getCookie";
import getURL from "../urlGetter" ;

export default function CreateNewCase(props){
      
    //const options = props.data.map(item=>{ return {value : item.id , label : item.name}});
    const { control, handleSubmit } = useForm();
    const [caseCreated,setCaseCreated] = useState(null)

    const url = getURL()+"/api/systems/?format=json";
    const [data,setData] =useState();
    useEffect(() => {
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
      data.system = data.system.value;
      data.gender = data.gender.value;
      console.log(data);
      var csrftoken = getCookie('csrftoken')
      var url = getURL()+'/api/case-create/'
      // var url = 'http://127.0.0.1:8000/api/case-create/'

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
        if(data.id){
          window.location.href = "http://localhost:3000/caseedit/"+String(data.id)+"/";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      //window.location.href = "http://localhost:3000/caseedit/"+String(caseCreated);

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
      <Form.Label>System</Form.Label>
      <Controller
        name="system"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={data} 
        />}
      />
      <Button variant="primary" type="submit">Submit</Button>
      {/* {caseCreated?<> case {caseCreated} created. please edit case findings, maybe also add a delete case here?</>: <input type="submit" />} */}
    </form>
    </Card>
    {/* after new case is created, we want to edit all associated caseres, called with caseid of newly created case */}
    {/* {caseCreated && <EditCaseResults caseId = {caseCreated}/>} */}
    
  </div>
}
//export default SelectExamType;