import React, { useState } from 'react';
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
import { FavoriteCard } from './FavoriteCard';
import axios from 'axios';
import { UpdateView } from './updateView';

export class ProfileView extends React.Component {
  render() {
    const { movies, onBackClick, userInfo, FavoriteMovies } = this.props;
    console.log(movies, userInfo);

    // const FavMoviesList = userInfo.FavoriteMovies;

    console.log(FavoriteMovies);

    const onUpdateClick = () => {
      <UpdateView />;
    };

    const onDeregisterClick = () => {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');

      axios
        .delete(
          `https://szmyflix.herokuapp.com/users/${userInfo.Username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          alert('Your account is deregistered!');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.open('/', '_self'); //the second argument '_self is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert('unable to deregister');
        });
    };

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Button className="deregister" onClick={onDeregisterClick}>
                  Deregister your account?
                </Button>
                <Card.Body>
                  <Card.Title>Welcome to your profile</Card.Title>
                  <Form>
                    <fieldset disabled>
                      <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={userInfo.Username}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder=""
                          minLength="8"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder={userInfo.Email}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                          type="text"
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
        <Card.Title>Favorite Movies</Card.Title>
        {FavoriteMovies.length !== 0 ? (
          <Row className="justify-content-md-center">
            {FavoriteMovies.map((movieId) => {
              let movie = movies.find((m) => m._id === movieId);
              return (
                <Col md={3}>
                  <FavoriteCard key={movie.id} movie={movie} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <p>No Favorite Movie.</p>
        )}
        <Row className="justify-content-md-between">
          <Link to={`/user-update/${userInfo.Username}`}>
            <Button variant="primary" className="mt-3" onClick={onUpdateClick}>
              Update
            </Button>
          </Link>
          <Button onClick={() => onBackClick()} className="back mt-3">
            Back
          </Button>
        </Row>
      </Container>
    );
  }
}
