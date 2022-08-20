import React from 'react';
import PropType from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function DirectorView(props) {
  console.log(props);
  const director = props.director;
  const movies = props.movies;
  const url_name = director.Name.replaceAll(' ', '');
  let url = '../images/' + url_name + '.jpg';
  console.log(director, url);
  console.log('Landed on directorview');
  return (
    <Container>
      <Row>
        <Col>
          <Card className="director-view">
            <Card.Img variant="top" src={url} />
            <Card.Body>
              <Card.Text>Name:{director.Name}</Card.Text>
              <Card.Text>Bio:{director.Bio}</Card.Text>
              <Card.Text>Birth: {director.Birth}</Card.Text>
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
