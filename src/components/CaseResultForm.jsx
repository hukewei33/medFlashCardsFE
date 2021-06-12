import React ,{ useState }from "react";
import { Button,Container,Row,Col,Card,Form } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";


function CaseResultForm(props){
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
    
    const options = props.caseres.result.medTest.result_set.map(item=>{ return {value : item , label : item.name}});
    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        //console.log(data)
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
    

    return <>{props.caseres.id} caseRes

    <form onSubmit={handleSubmit(onSubmit)}>
    
      <Form.Label>Exam Type</Form.Label>
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