import React from 'react';
import PropType from 'prop-types';
import { Button, Card, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, AddToFav, FavoriteMovies, RemoveFromFav } =
      this.props;
    let url = '../images/' + movie.ImagePath;

    console.log(typeof movie);
    console.log(typeof onBackClick);

    return (
      <Card className="movie-view">
        <Card.Img variant="top" src={url} className="movieView-img" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <div className="cardContent">
            <Card.Text className="movie-view-Genre">
              <span>Genre:</span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </Card.Text>
            <Card.Text className="movie-view-Director">
              <span>Director:</span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </Card.Text>
            <Card.Text className="movie-view-info">
              <span>Description: </span>
              {movie.Description}
            </Card.Text>
          </div>
          <Row className="movieView-buttons">
            {FavoriteMovies.includes(movie._id) ? (
              <Button onClick={() => RemoveFromFav(movie, FavoriteMovies)}>
                Unlike
              </Button>
            ) : (
              <Button onClick={() => AddToFav(movie, FavoriteMovies)}>♥</Button>
            )}
            <Button onClick={() => onBackClick()}>Back</Button>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.proptype = {
  movie: PropType.shape({
    Title: PropType.string.isRequired,
    Description: PropType.string.isRequired,
    Genre: PropType.shape({
      Name: PropType.string.isRequired,
    }),
    Director: PropType.shape({
      Name: PropType.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropType.func.isRequired,
};
