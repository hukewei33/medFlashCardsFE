import React from "react";
import useFetch from "./fetchGet";
import { Table} from 'react-bootstrap';

export default function CaseIndex(){
    const { data, loading } = useFetch("http://127.0.0.1:8000/api/case-list/?format=json");
    if (data && ! loading ){
        if(data.length === 0 ){
            return <>no cases in app</>
        }
        return <Table>
        <thead>
            <tr>
                <th>Case ID</th>
                <th>Case Name</th>
                <th>Exam Type</th>
                
            </tr>
        </thead>
        <tbody>
            {data.map(x=> <tr><td>{x.id}</td><td><a href={x.id}>{x.name}</a></td><td>{x.examtype.name}</td></tr>)}
        </tbody>
            
        </Table>
        
        
    }
    else{
        return <>loading</>
    }

}