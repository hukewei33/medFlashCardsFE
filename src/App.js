import './App.css';
import React from "react";
import CaseTest from "./components/casetest/CaseTest.jsx";
import NewCaseWrapper from "./components/newcase/NewCaseWrapper";
import Login from "./components/account/Login";
import Register from "./components/account/Register"
import useToken from './components/account/useToken';
import Logout from "./components/account/Logout";
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch,useParams } from 'react-router-dom';
import CaseIndex from "./components/caseIndex"


function App() {

  const { token, setToken, clearToken } = useToken();
  if(!token) {
    return <>
    <Login setToken={setToken} />
    <Register setToken={setToken} />
    </>
  }
  

  return (
    <div className="App">
    <h1>App wrapper Layer</h1>
      
    <div className="wrapper">
      <h1>Application Name </h1>

      <Navbar clearToken = {clearToken}/>
      
      <BrowserRouter>
        <Switch>
          <Route path="/caseindex">
            <CaseIndex/>
          </Route>
          <Route path="/newcase">
            <NewCaseWrapper token = {token} />
          </Route>
          <Route path="/:id" children={<CaseTestWrapper />} />
        </Switch>
      </BrowserRouter>
    </div>
     
    </div>
  );
}

function CaseTestWrapper() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      {/* <h3>ID: {id}</h3> */}
      <CaseTest testid = {id}/>
    </div>
  );
}



export default App;
