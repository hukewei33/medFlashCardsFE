import React ,{ useState }from "react";
import { Button,Container,Row,Col,Card,Form } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import EditCaseResults from "./EditCaseResults";
function SelectExamType(props){
  
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  } 
    
    const options = props.data.map(item=>{ return {value : item.id , label : item.name}});
    const { control, handleSubmit } = useForm();
    const [caseCreated,setCaseCreated] = useState(null)

    const onSubmit = data => {
      //console.log(data);
      data.examtype = data.examtype.value;
      data.gender = data.gender.value;
      console.log(data);
      var csrftoken = getCookie('csrftoken')
      var url = 'http://127.0.0.1:8000/api/case-create/'

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log('id',data.id)
        setCaseCreated(data.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    };
    
    
    
    return <div className="App">
    
    <form onSubmit={handleSubmit(onSubmit)}>
    
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
        render={({ field }) => <Form.Control type="number" placeholder=" enter age" {...field}/>}
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
      {caseCreated?<> case {caseCreated} created. please edit case findings</>: <input type="submit" />}
    </form>

    {caseCreated && <EditCaseResults caseId = {caseCreated}/>}
    
  </div>
}
export default SelectExamType;