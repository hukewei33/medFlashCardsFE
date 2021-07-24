import React from "react";
import { Button,Modal, Card } from 'react-bootstrap';

export default function ShowFindings(props){
    if(props.cur){
    return <Card >
        <Card.Title>{props.cur.finding.action.name} finding</Card.Title>
    {props.cur.finding.imagedata&& <Card.Img variant="top" src={props.cur.finding.imagedata} /> }
   
    <Card.Body>
      {props.cur.finding.audiodata && <audio controls src={props.cur.finding.audiodata} > your browser does not support the audio elem</audio>}
      <Card.Text>             
        {props.cur.finding.des && <>{props.cur.finding.des}</>}
        {props.cur.finding.name && <>{props.cur.finding.name}</>}
      </Card.Text>
    </Card.Body>
    </Card>}
    else{
        return <Card ><Card.Title>No actions yet</Card.Title></Card>
    }
}