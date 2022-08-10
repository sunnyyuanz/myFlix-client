import React, { useState } from 'react';
import PropType from 'prop-types';
import { Form, Button} from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server for authentication
    //then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  const onSignUpClick = () => {
    console.log('signupCLick is clicked');
  };

  return (
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button type="submit" onClick={onSignUpClick}>
          Sign Up
        </Button>
      </Form>
  );
}

LoginView.propTypes = {
  user: PropType.shape({
    username: PropType.string,
    password: PropType.string,
  }).isRequired,
  onLoggedIn: PropType.func.isRequired,
};
