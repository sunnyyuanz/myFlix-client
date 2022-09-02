import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar-view.scss';

export function MenuBar(user) {
  let accessToken = localStorage.getItem('token');
  let username = localStorage.getItem('user');

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };
  console.log(user);

  return (
    <Navbar className="main-nav" sticky="top" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="navbar-logo" href="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {accessToken ? (
              <ul className="navbar">
                <Nav.Link href="#home">
                  <Link to={'/'}>Movies</Link>
                </Nav.Link>
                <Nav.Link href="#user">
                  <Link to={`/users/${username}`}>Account</Link>
                </Nav.Link>
                <Button
                  variant="link"
                  onClick={() => {
                    onLoggedOut();
                  }}
                >
                  Sign Out
                </Button>
              </ul>
            ) : (
              <ul className="navbar">
                <Nav.Link href="/">Sign In</Nav.Link>
                <Nav.Link href="#register">
                  <Link to={'/register'}>Sign Up</Link>
                </Nav.Link>
              </ul>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
