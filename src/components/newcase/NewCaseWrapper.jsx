import React , { useEffect, useState } from "react";
import CreateNewCase from "./CreateNewCase";
import useFetch from "../fetchGet";
import getURL from "../urlGetter" ;


export default  function NewCase(props){
  //get the kinds of exam types required to build the select in createnewcase
    const url = getURL()+"/api/systems/?format=json";
    const [data,setData] =useState();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          setData(json);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();
  }, []);


    //const { data, loading } = useFetch(url);
  
    if (data){
    return <div> 
      
    {(typeof data ==! 'undefined')? <div>...loading</div> : 
      <CreateNewCase data = {data}  token = {props.token}/>
    }
    </div>
    }
    return <></>
}


  