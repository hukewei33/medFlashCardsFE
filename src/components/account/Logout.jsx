import React from 'react';
import { Button } from 'react-bootstrap';

export default function Logout(props){
    return <Button variant="primary" onClick = {props.logout}>Logout</Button>
}