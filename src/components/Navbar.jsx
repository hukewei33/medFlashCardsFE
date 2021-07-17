import React from 'react';
import Logout from "./account/Logout"
import { Nav } from 'react-bootstrap';

export default function NavBar(props){
    return <Nav variant="pills" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link href="/0">Random test</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/caseindex">Select a test</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/newcase">Enter new case</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Logout logout = {props.clearToken}/>
    </Nav.Item>
  </Nav>
  

}