import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie, AddToFav, FavoriteMovies, RemoveFromFav } = this.props;
    let url = 'images/' + movie.ImagePath;

    return (
      <Card>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          {FavoriteMovies.includes(movie._id)?(
            <Button onClick={() => RemoveFromFav(movie, FavoriteMovies)}>Unlike</Button>

          ):(
            <Button onClick={() => AddToFav(movie, FavoriteMovies)}>♥</Button>
          )}
          
        </Card.Body>
      </Card>
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
