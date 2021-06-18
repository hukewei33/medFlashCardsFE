import React from "react";
import CreateNewCase from "./CreateNewCase";
import useFetch from "../fetchGet";


function NewCase(props){
  //get the kinds of exam types required to build the select in createnewcase
    const url = "http://127.0.0.1:8000/api/examtypes/?format=json";
    const { data, loading } = useFetch(url);
  
    if (data){
    
    return <div> 
    {loading && (typeof data ==! 'undefined')? <div>...loading</div> : 
      <CreateNewCase data = {data}  />
    }
    </div>
    }
    return <></>
}

export default NewCase;
  