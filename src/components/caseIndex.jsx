import React ,{ useState,useEffect }from "react";
//import useFetch from "./fetchGet";
import { Table,Button} from 'react-bootstrap';
import getURL from "./urlGetter";

export default function CaseIndex(){
    //const { data, loading } = useFetch(getURL()+"/api/case-list/?format=json");
    const [data, setData] = useState(null);
    const [systems,setSystems] = useState(null);
    const [filterName,setFilter] = useState("all systems");
    useEffect(() => {
      const url = getURL()+"/api/case-list/?format=json";
      const newsystems = new Set()
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          setData(json);
          newsystems.add("all systems");
          json.forEach(x=>newsystems.add(x.system.name));
          console.log(newsystems)
          setSystems(newsystems);
        }
        catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    },[]);

    let filterHelper = (elem)=> {return filterName === "all systems" || elem.system.name === filterName }

    if (data !== null && systems !== null){
        if(data.length === 0 ){
            return <>no cases in app</>
        }
        return <>
        <Button variant="primary" href="/0">Select Random case &#x1F500; </Button><br/>
        <h1>Filters</h1>
        {[...systems].map(x=><Button variant="primary" onClick = {()=>setFilter(x)}>{x}</Button>)}
        <h1>{filterName} cases</h1>
        <Table>
        <thead>
            <tr>
                <th>Case ID</th>
                <th>Case Name</th>
                <th>Systems Type</th>
                <th>Edit Case</th>
                
            </tr>
        </thead>
        <tbody>
            {data.filter(filterHelper).map(x=> <tr><td>{x.id}</td><td><a href={"/"+x.id}>{x.name}</a></td><td>{x.system.name}</td><td><a href={'/caseedit/'+x.id}>&#128394;</a></td></tr>)}
        </tbody>
            
        </Table>  
        
        </>     
    }
    else{
        return <>loading</>
    }

}