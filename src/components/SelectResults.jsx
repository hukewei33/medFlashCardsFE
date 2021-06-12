import React ,{ useState, useEffect }from "react";
import { Button,Container,Row,Col,Card,Form } from 'react-bootstrap';

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }, []);
    return { data, loading };
  };

  function SelectResults(props){
    const url = "http://127.0.0.1:8000/api/medtests/?exam="+String(props.id)+"&format=json";
    const { data, loading } = useFetch(url);
    
   
    if (data){
        console.log(data);
    return <div> 
        hi
    </div>
    }
    return <></>
}

export default SelectResults;
  