import React ,{ useState,useEffect }from "react";
import CaseResultForm from "./CaseResultForm";
import useFetch from "../fetchGet";
import getURL from "../urlGetter" ;
import { Button,Row,Col,Accordion} from 'react-bootstrap';


//use caseid of newly created to get array of accociated caseres
export default function EditCaseResults(props){

    const url = getURL()+"/api/case-res/"+String(props.caseId)+"/?format=json";
    const [data,setData] =useState();
    const [clicked,setClicked] =useState(0);
   

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            //group by regions
             //group each item by location in regionDict
            const resByRegion = {};
            json.caseres_set.forEach(function (arrayItem) {
              var key = arrayItem.finding.action.loc.region;
              //initalise as an empty array 
              if (!(key in resByRegion)) {resByRegion[key] = [];}
              var tmp = resByRegion[key];
              tmp.push(arrayItem);
            });
            setData(resByRegion);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);
    //const { data, loading } = useFetch(url);
    if(!data ){
        return <div>...loading</div>
    }
    else{
        return <div>
          <Accordion>
                      
          { Object.entries(data).map((item,idx)=><>
          <Accordion.Item eventKey={String(idx)}>
            < Accordion.Header>{item[0]} region findings </Accordion.Header>
            {/* {String(idx)}{item[0]} region results  */}
            <Accordion.Body>
            <Row xs={1} md={4} className="g-4">
              {item[1].map(resItem=>
              <Col>
                <CaseResultForm caseres = {resItem} caseId ={props.caseId} clicked = {clicked}/>
              </Col>
              )}
            </Row> 
            </Accordion.Body>
          </Accordion.Item>
          
          </>)}
          </Accordion>
            {/* <Row xs={1} md={4} className="g-4">
  {data.caseres_set.map((item, idx) => (
    <Col>
      <CaseResultForm caseres = {item} caseId ={props.caseId} clicked = {clicked}/>
    </Col>
  ))}
</Row> */}
       {/* {data.caseres_set.map(item=> <CaseResultForm caseres = {item} caseId ={props.caseId} clicked = {clicked}/> )} */}
        <Button variant="primary" onClick={()=>{setClicked(clicked+1);alert("all updated")}}>UpdateAll</Button>
        </div> 
    }
    
}
