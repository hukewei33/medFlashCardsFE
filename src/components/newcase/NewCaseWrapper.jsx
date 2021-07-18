import React from "react";
import CreateNewCase from "./CreateNewCase";
import useFetch from "../fetchGet";
import getURL from "../urlGetter" ;


export default  function NewCase(props){
  //get the kinds of exam types required to build the select in createnewcase
    const url = getURL()+"/api/systems/?format=json";
    const { data, loading } = useFetch(url);
  
    if (data){
    return <div> 
      
    {loading && (typeof data ==! 'undefined')? <div>...loading</div> : 
      <CreateNewCase data = {data}  token = {props.token}/>
    }
    </div>
    }
    return <></>
}


  