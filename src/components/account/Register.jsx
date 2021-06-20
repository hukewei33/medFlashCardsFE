import React,{ useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Form,Alert,Button } from 'react-bootstrap';
import getCookie from "../getCookie";
// import './Login.css';


export default function Register(props) {
    const [badLogin,setBadLogin] = useState(false)
    const { control, handleSubmit } = useForm();
    const onSubmit = data => {
      console.log(data);
      var csrftoken = getCookie('csrftoken')
      fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken':csrftoken
            },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data.token){
                props.setToken(data.token);
                console.log("good create account");
            }
            else{
                console.log("badlogin");
                setBadLogin(true);
            }
            // setCaseCreated(data.id);
          })
          .catch((error) => {
            console.error('Error:', error);
          })
    }
            
  
  return(
    <div className="login-wrapper">
      <h1>Or create an account</h1>
        {badLogin && <Alert  variant='warning'>Something is wrong!</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Label> Enter Username</Form.Label>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => <Form.Control type="text" placeholder="username" {...field} />}
      />
      <Form.Label> Enter Username</Form.Label>
       <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <Form.Control type="text" placeholder="email" {...field} />}
      />
      <Form.Label> Enter Password</Form.Label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <Form.Control type="password" placeholder="username" {...field} />}
      />
      <Form.Label>Confirm Password</Form.Label>
      <Controller
        name="password2"
        control={control}
        render={({ field }) => <Form.Control type="password" placeholder="password" {...field} />}
      />
      <Button variant="primary" type="submit">Submit
  </Button>
      </form>
    </div>
  )
}