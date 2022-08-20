import React from 'react';
import PropType from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function GenreView(props) {
  console.log(props);
  const genre = props.genre;
  const movies = props.movies;
  console.log(genre);
  console.log('Landed on genreview');
  return (
    <Container>
      <Row>
        <Col>
          <Card className="genre-view">
            <Card.Body>
              <Card.Text>Name:{genre.Name}</Card.Text>
              <Card.Text>Description:{genre.Description}</Card.Text>
              <Button onClick={() => props.onBackClick()}>Back</Button>
            </Card.Body>
          </Card>
          <Card.Title>Related Movies</Card.Title>
          <Row>
            {movies.map((m) => {
              let movieUrl = '../images/' + m.ImagePath;
              return (
                <Col md={3}>
                  <Link to={`/movies/${m._id}`}>
                    <Card key={m._id} className="mb-3">
                      <Card.Img src={movieUrl} />
                      <Card.Title>{m.Title}</Card.Title>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
