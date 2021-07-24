import './App.css';
import React from "react";
import CaseTest from "./components/casetest/CaseTest.jsx";
import NewCaseWrapper from "./components/newcase/NewCaseWrapper";
import Login from "./components/account/Login";
import Register from "./components/account/Register"
import useToken from './components/account/useToken';
//import Logout from "./components/account/Logout";
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch,useParams } from 'react-router-dom';
import CaseIndex from "./components/caseIndex"
import EditCaseWrapper from "./components/editCase/EditCaseWrapper"
import useFetch from"./components/fetchGet";
import getURL from "./components/urlGetter"

function App() {

  const { token, setToken, clearToken } = useToken();
  
  if(!token) {
    return <>
    <Login setToken={setToken} />
    <Register setToken={setToken} />
    </>
  }
  

  return <div className="App">
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
          <Route path="/caseedit">
            <EditCaseWrapper token = {token} />
          </Route>
          
          <Route path="/:id" children={<CaseTestWrapper />} />
        </Switch>
      </BrowserRouter>
    </div>
     
    </div>
  ;
}

function CaseTestWrapper() {
  let { id } = useParams();
  const url = getURL()+"/api/findings/?format=json";
  const { data, loading } = useFetch(url);
  return loading? <>loading</>:<CaseTest testid = {id} defData = {data}/>;
}




export default App;
