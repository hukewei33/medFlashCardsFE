import React from "react";
import CaseResultForm from "./CaseResultForm";
import useFetch from "../fetchGet";


//use caseid of newly created to get array of accociated caseres
export default function EditCaseResults(props){

    const url = "http://127.0.0.1:8000/api/case-res/"+String(props.caseId)+"/?format=json";
    const { data, loading } = useFetch(url);
    if(loading || !data ){
        return <div>...loading</div>
    }
    else{
        return <div> {data.caseres_set.map(item=> <CaseResultForm caseres = {item} caseId ={props.caseId} /> )}</div> 
    }
    
}
