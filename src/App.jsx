//import './App.css';
import React ,{ useState,useEffect }from "react";
import CaseTest from "./components/casetest/CaseTest.jsx";
import NewCaseWrapper from "./components/newcase/NewCaseWrapper";
import Login from "./components/account/Login";
import Register from "./components/account/Register"
import useToken from './components/account/useToken';
//import Logout from "./components/account/Logout";
import Nav from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch,useParams } from 'react-router-dom';
import CaseIndex from "./components/caseIndex"
import EditCaseWrapper from "./components/editCase/EditCaseWrapper"
//import useFetch from"./components/fetchGet";
import getURL from "./components/urlGetter"

function App() {

  const { token, setToken, clearToken } = useToken();

  const [data, setData] = useState(null);
  useEffect(() => {
    const url = getURL()+"/api/findings/?format=json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setData(json);
      }
      catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  },[]);
  
  if(!token) {
    return <>
    <Login setToken={setToken} />
    <Register setToken={setToken} />
    </>
  }
  

  return <div className="App">
    {/* <h1>App wrapper Layer</h1> */}
      
    <div className="wrapper">
      {/* <h1>Application Name </h1> */}

      <Nav clearToken = {clearToken}/>
      
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
          
          <Route path="/:id" children={<CaseTestWrapper data = {data}/>} />
        </Switch>
      </BrowserRouter>
    </div>
     
    </div>
  ;
}

function CaseTestWrapper(props) {
  let { id } = useParams();
  
  //const { data, loading } = useFetch(url);

  return props.data===null? <>loading</>:<CaseTest testid = {id} defData = {props.data}/>;
  //return <CaseTest testid = {id} defData = {props.data}/>;
}




export default App;
