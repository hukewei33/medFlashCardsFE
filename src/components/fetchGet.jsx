import { useState, useEffect }from "react";

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }, []);
  
    return { data, loading,setData };
  };

export default useFetch;