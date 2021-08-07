import React , { useState, useEffect } from "react";
import { Button,Alert,Card} from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
import getCookie from "../getCookie";
import getURL from "../urlGetter" ;

//edit each caseres
export default function CaseResultForm(props){
    
    const options = props.caseres.finding.action.finding_set.map(item=>{ return {value : item , label : item.name}});
    const getOriginalFinding = (elem)=> elem.value.id === props.caseres.finding.id
    const defIndex = options.findIndex(getOriginalFinding)
    const { control, handleSubmit } = useForm();

    const onSubmit = data => {
        const updatedCaseRes = {finding:data.finding.value.id,
                                case: props.caseId
                              };
        console.log(props.caseres.id,updatedCaseRes);
        var csrftoken = getCookie('csrftoken')
        var url = getURL()+'/api/case-res-update/'+String(props.caseres.id)+'/'
        fetch(url, {
            method:'PATCH',
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

    useEffect(() => {
      if(props.clicked>0){handleSubmit(onSubmit)()};
    },[props.clicked]);

    const [show, setShow] = useState(false);
    return<Card style={{ width: '18rem' }}> edit {props.caseres.finding.action.name} findings
    {show && <Alert variant="primary" onClose={() => setShow(false)} dismissible>
        <p>
        {props.caseres.finding.action.name} finding updated
        </p>
      </Alert>}
    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
    <form onSubmit={ handleSubmit(onSubmit)}>
    
      <Controller
        name="finding"
        control={control}
        defaultValue = {options[defIndex]}
        render={({ field }) => <Select 
          {...field} 
          defaultValue={options[defIndex]}
          options={options} 
        />}
      />
           
      <Button variant="primary" type="submit" onClick={() => setShow(true)}>Update</Button>      
    </form>
    </Card>
}
