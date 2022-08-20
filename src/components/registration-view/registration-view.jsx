import React, { useState } from 'react';
import PropType from 'prop-types';
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState('');
  //Declare hook for each input
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    confirmPasswordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    let hasAtsign = email.indexOf('@') > -1;
    let hasDot = email.indexOf('.') > -1;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({
        ...values,
        usernameErr: 'Username must be 2 character long',
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: 'Password must be 6 characters long',
      });
      isReq = false;
    }
    if (!confirmPassword) {
      setValues({ ...values, confirmPasswordErr: 'Confirm Password Required' });
      isReq = false;
    } else if (confirmPassword !== password) {
      setValues({
        ...values,
        confirmPasswordErr: 'Confirm Password does not match with Password',
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Required' });
      isReq = false;
    } else if (!hasAtsign || !hasDot) {
      setValues({ ...values, emailErr: 'Email does not appear to be valid' });
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://szmyflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self'); //the second argument '_self is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert('unable to register');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password must be 8 or more charaters"
                      minLength="8"
                    />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm the password"
                      minLength="8"
                    />
                    {values.confirmPasswordErr && (
                      <p>{values.confirmPasswordErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Your Birthday"
                      required
                      pattern="\d{4}-\d{2}-\d{2}"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.proptype = {
  handleSubmit: PropType.func.isRequired,
};
