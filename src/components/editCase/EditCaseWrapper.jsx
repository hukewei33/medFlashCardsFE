import React from "react";
import EditCaseResults from "../newcase/EditCaseResults"; 
import {
    Switch,
    Route,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import DeleteCase from "./DeleteCase"

export default function EditCaseWrapper(props){
    let { path, url } = useRouteMatch();
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
  
    return (
      <div>
        <h1> work in progress</h1>
        <h3>edit {caseId}</h3>
        <DeleteCase token = {props.token} id = {caseId}/>
        <EditCaseResults caseId = {caseId}/>
      </div>
    );
  }