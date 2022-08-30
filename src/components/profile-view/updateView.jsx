import React, { useEffect, useState } from 'react';
import PropType, { element } from 'prop-types';
import { Link } from 'react-router-dom';
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

export function UpdateView({ userInfo, onBackClick }) {
  //   console.log('This is UpdateView');
  //   console.log(userInfo);
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
      setUsername(userInfo.Username);
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
      setPassword(userInfo.Password);
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
      setConfirmPassword(userInfo.Password);
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
      setEmail(userInfo.Email);
      setValues({ ...values, emailErr: 'Email Required' });
      isReq = false;
    } else if (!hasAtsign || !hasDot) {
      setValues({ ...values, emailErr: 'Email does not appear to be valid' });
      isReq = false;
    }
    if (!birthday) {
      setBirthday(userInfo.Birthday);
    }

    return isReq;
  };

  const onSubmitClick = (e) => {
    let token = localStorage.getItem('token');
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://szmyflix.herokuapp.com/users/${userInfo.Username}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Your profile is updated!');
          localStorage.setItem('user', response.data.Username);
          window.open('/', '_self'); //the second argument '_self is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert('unable to update');
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
                <Card.Title>Welcome to your profile</Card.Title>
                <Form>
                  <fieldset>
                    <Form.Group>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={userInfo.Username}
                      />
                      {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={userInfo.Password}
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
                        placeholder={userInfo.Password}
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
                        placeholder={userInfo.Email}
                      />
                      {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder={userInfo.Birthday}
                      />
                    </Form.Group>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-between">
        <Button variant="primary" className="mt-3" onClick={onSubmitClick}>
          Submit
        </Button>
        <Button onClick={() => onBackClick()} className="back mt-3">
          Back
        </Button>
      </Row>
    </Container>
  );
}
