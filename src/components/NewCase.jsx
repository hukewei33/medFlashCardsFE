import React ,{ useState, useEffect }from "react";
import { Button,Container,Row,Col,Card,Form } from 'react-bootstrap';
import SelectExamType from "./SelectExamType";
import SelectResults from "./SelectResults"

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

function NewCase(props){
    const url = "http://127.0.0.1:8000/api/examtypes/?format=json";
    const { data, loading } = useFetch(url);
    const [typeSelected,setTypeSelected] = useState(false);
    const [examId,setExamId]= useState(null);

    if (data){
    
    return <div> 
    {loading && (typeof data ==! 'undefined')? <div>...loading</div> : 
    <div>
        {typeSelected?<>hi  {examId} <SelectResults id ={examId} /></> :
        <SelectExamType data = {data}  setTypeSelected = {setTypeSelected} setExamId={setExamId}/>  }
    </div> }
    </div>
    }
    return <></>
}

export default NewCase;
  