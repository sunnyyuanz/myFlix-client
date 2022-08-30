import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Container>
            <MainView />
          </Container>
        </Provider>
      </div>
    );
  }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
