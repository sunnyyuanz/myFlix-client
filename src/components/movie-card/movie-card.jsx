import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';
import { Row } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, AddToFav, FavoriteMovies, RemoveFromFav } = this.props;
    let url = 'images/' + movie.ImagePath;

    return (
      <Link to={`/movies/${movie._id}`}>
        <Card className="movieCard">
          <Card.Img variant="top" src={url} className="movies-img" />
          <Card.Body className="movieCard-content">
            <Card.Title className='moviecard-title'>{movie.Title}</Card.Title>
            <Card.Text className="wordCountLimited">
              {movie.Description}
            </Card.Text>
          </Card.Body>
          <Row className="m-2 buttons">
            {FavoriteMovies.includes(movie._id) ? (
              <Button onClick={() => RemoveFromFav(movie, FavoriteMovies)}>
                Unlike
              </Button>
            ) : (
              <Button onClick={() => AddToFav(movie, FavoriteMovies)}>♥</Button>
            )}
          </Row>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
