import React from "react";
import useFetch from "./fetchGet";
import { Table} from 'react-bootstrap';

export default function CaseIndex(){
    const { data, loading } = useFetch("http://127.0.0.1:8000/api/case-list/?format=json");
    if (data && ! loading ){
        
        return <Table>
        <thead>
            <tr>
                <th>Case ID</th>
                <th>Case Name</th>
            </tr>
        </thead>
        <tbody>
            {data.map(x=> <tr><td><a href={x.id}>{x.id}</a></td><td>{x.name}</td></tr>)}
        </tbody>
            
        </Table>
        
        
    }
    else{
        return <>loading</>
    }

}