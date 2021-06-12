import React ,{ useState,useEffect }from "react";
import CaseResultForm from "./CaseResultForm";

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }, []);
    console.log(data);
    return { data, loading };
  };

function EditCaseResults(props){
    const url = "http://127.0.0.1:8000/api/case-res/"+String(props.caseId)+"/?format=json";
    const { data, loading } = useFetch(url);
    if(loading || !data ){
        return <div>...loading</div>
    }
    else{
        return <div> {data.caseres_set.map(item=> <CaseResultForm caseres = {item} caseId ={props.caseId} /> )}</div> 
    }
    
}

export default EditCaseResults;