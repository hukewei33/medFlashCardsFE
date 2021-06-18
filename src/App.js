import './App.css';
import React from "react";
import CaseTest from "./components/casetest/CaseTest.jsx";
import NewCaseWrapper from "./components/newcase/NewCaseWrapper";
import Login from "./components/Login";
import useToken from './components/useToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



function App() {

  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }
  

  return (
    <div className="App">
    <h1>App wrapper</h1>
      
    <div className="wrapper">
      <h1>Application</h1>
      <nav>
        <ul>
          <li><a href="/casetest">Test yourself</a></li>
          <li><a href="/newcase">Enter a new Case</a></li>  
        </ul>
      </nav>
      <BrowserRouter>
        <Switch>
          <Route path="/casetest">
            <CaseTest/> 
          </Route>
          <Route path="/newcase">
            <NewCaseWrapper />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
     
    </div>
  );
}

export default App;
