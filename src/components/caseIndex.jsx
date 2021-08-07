import React ,{ useState,useEffect }from "react";
//import useFetch from "./fetchGet";
import { Table} from 'react-bootstrap';
import getURL from "./urlGetter";

export default function CaseIndex(){
    //const { data, loading } = useFetch(getURL()+"/api/case-list/?format=json");
    const [data, setData] = useState(null);
    useEffect(() => {
      const url = getURL()+"/api/case-list/?format=json";
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          setData(json);
        }
        catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    },[]);

    if (data !== null ){
        if(data.length === 0 ){
            return <>no cases in app</>
        }
        return <Table>
        <thead>
            <tr>
                <th>Case ID</th>
                <th>Case Name</th>
                <th>Systems Type</th>
                <th>Edit Case</th>
                
            </tr>
        </thead>
        <tbody>
            {data.map(x=> <tr><td>{x.id}</td><td><a href={"/"+x.id}>{x.name}</a></td><td>{x.system.name}</td><td><a href={'/caseedit/'+x.id}>&#128394;</a></td></tr>)}
        </tbody>
            
        </Table>       
    }
    else{
        return <>loading</>
    }

}