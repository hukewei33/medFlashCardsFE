import React from "react";
import { Button} from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import getCookie from "../getCookie";

//edit each caseres
function CaseResultForm(props){
    
    const options = props.caseres.result.medTest.result_set.map(item=>{ return {value : item , label : item.name}});
    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        const updatedCaseRes = {result:data.result.value.id,
                                case: props.caseId,
                                req:data.req.value};
        console.log(props.caseres.id,updatedCaseRes);
        var csrftoken = getCookie('csrftoken')
        var url = 'http://127.0.0.1:8000/api/case-res-update/'+String(props.caseres.id)+'/'
        fetch(url, {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify(updatedCaseRes)
          }).then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    

    return <> edit {props.caseres.result.medTest.name} results

    <form onSubmit={handleSubmit(onSubmit)}>
    
      <Controller
        name="result"
        control={control}
        defaultValue = {options[0]}
        render={({ field }) => <Select 
          {...field} 
          defaultValue={options[0]}
          options={options} 
        />}
      />
     
      <Controller
        name="req"
        control={control}
        defaultValue = {{ value: false, label: "Not Required" }}
        render={({ field }) => <Select 
        {...field} 
        options={[
            { value: false, label: "Not Required" },
            { value: true, label: "Required" }
          ]}
      />}
      />
      
      <Button variant="primary" type="submit">Update</Button>
     
      
    </form>
    </>
}
export default CaseResultForm;