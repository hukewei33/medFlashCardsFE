import React from 'react';
import Logout from "./account/Logout"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export default function NavWrapper(props){
    return <Navbar bg="dark" variant="dark" >
      <Container>
      <Navbar.Brand >Passing med school</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/0">Random test</Nav.Link>
        <Nav.Link href="/caseindex">Select a test</Nav.Link>
        <Nav.Link href="/newcase">Enter new case</Nav.Link>
        <Nav.Item>
          <Logout logout = {props.clearToken}/>
        </Nav.Item>
        
      </Nav>
    
    
    {/* <Navbar.Item>
     
    </Navbar.Item>
    <Navbar.Item>
      <Navbar.Link href="/caseindex">Select a test</Navbar.Link>
    </Navbar.Item>
    <Navbar.Item>
      <Navbar.Link href="/newcase">Enter new case</Navbar.Link>
    </Navbar.Item>
    <Navbar.Item>
        <Logout logout = {props.clearToken}/>
    </Navbar.Item> */}
    </Container>
  </Navbar >
}