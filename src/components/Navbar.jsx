import React from 'react';
import Logout from "./account/Logout"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export default function NavWrapper(props){
    return <Navbar bg="dark" variant="dark" >
      <Container>
      <Navbar.Brand href="/">Passing med school</Navbar.Brand>
      <Nav className="me-auto">
        {/* <Nav.Link href="/0">Random test</Nav.Link> */}
        <Nav.Link href="/caseindex">Select a test</Nav.Link>
        <Nav.Link href="/newcase">Enter new case</Nav.Link>
        <Nav.Item>
          <Logout logout = {props.clearToken}/>
        </Nav.Item>
        
      </Nav>
    </Container>
  </Navbar >
}