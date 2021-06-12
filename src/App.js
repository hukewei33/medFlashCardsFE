import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Cards from "./components/Cards.jsx";
import NewCase from "./components/NewCase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Container,Row,Col,Card ,Form} from 'react-bootstrap';

function App() {
  const [mode, setMode] = useState(null);
  function startTest(){
    setMode('test');
  }
  function startNew(){
    setMode('new');
  }
  return (
    <div className="App">
      { mode === null && <div>
      <Button variant="primary" onClick = {startTest}>Start Test</Button>
      <Button variant="primary" onClick = {startNew} >Enter Case</Button></div>}
      
      { mode === 'test' && <div><Cards/></div>}
      { mode === 'new' && <div><NewCase/></div>}
    </div>
  );
}

export default App;
