import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import {Navbar, Nav, Container } from 'react-bootstrap';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';

//main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render(){
        return(
            <div>
            <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Movies</Nav.Link>
              <Nav.Link href="#user">Account</Nav.Link>
              <Nav.Link href="#policy">Policy</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
            <Container>
            <MainView />
            </Container>
            </div>
        );
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

