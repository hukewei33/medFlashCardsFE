import React from "react";
import getURL from "../urlGetter"
import {Button } from 'react-bootstrap';
//import getCookie from "../getCookie";

export default function DeleteCase(props){
    function buttonHandle(){
        var url = getURL()+'/api/casedel/'+String(props.id)+'/'
       
        fetch(url, {
          method:'DELETE',
          headers:{
            'Authorization': "Token "+String(props.token)
          }
        }).catch((error) => {
          console.error('Error:', error);
        });

        window.location.replace("http://localhost:3000/caseindex/")
    }

    return <Button variant="danger" onClick = {buttonHandle}>Delete</Button>}