import React , { useEffect, useState } from "react";
import CreateNewCase from "./CreateNewCase";
//import useFetch from "../fetchGet";
import getURL from "../urlGetter" ;


export default  function NewCase(props){
  //get the kinds of exam types required to build the select in createnewcase
    
  //   const [data,setData] =useState();
  //   useEffect(() => {
  //     const url = getURL()+"/api/systems/?format=json";
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(url);
  //         const json = await response.json();
  //         console.log(json);
  //         setData(json);
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };
  
  //     fetchData();
  // }, []);


    //const { data, loading } = useFetch(url);
  
    if (true){
    return <div> 
      
    {(typeof data ==! 'undefined')? <div>...loading</div> : 
      <CreateNewCase   token = {props.token} default = {null}/>
    }
    </div>
    }
    return <></>
}


  