import React  , { useState, useEffect } from "react";
import EditCaseResults from "../newcase/EditCaseResults"; 
import {
    Switch,
    Route,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import DeleteCase from "./DeleteCase";
import getURL from "../urlGetter" ;
import CaseForm from "../newcase/CreateNewCase";

export default function EditCaseWrapper(props){
    let { path } = useRouteMatch();
    return  <Switch>
        <Route exact path={path}>
        <h3>Please select a case.</h3>
        </Route>
        <Route path={`${path}/:caseId`}>
            <EditCase token = {props.token} />
        </Route>
    </Switch>
}

function EditCase(props) {
    let { caseId } = useParams();

    const url = getURL()+"/api/case-res/"+String(caseId)+"/?format=json";
    const [data,setData] =useState(null);
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, [url]);

    return data?(
      <div>
        <h2>{data.name} details</h2>
        <CaseForm default = {data} token = {props.token}/>
        <DeleteCase token = {props.token} id = {caseId}/>
        <h3> {data.name} Findings</h3>
        <EditCaseResults caseId = {caseId} data = {data.caseres_set}/>
      </div>
    ):<>loading</>;
  }