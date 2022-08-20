import React from 'react';
import PropType from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, AddToFav, FavoriteMovies } = this.props;
    let url = '../images/' + movie.ImagePath;

    console.log(typeof movie);
    console.log(typeof onBackClick);

    return (
      <Card className="movie-view">
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="movie-view-Genre">
            Genre:
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </Card.Text>
          <Card.Text className="movie-view-Director">
            Director:
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </Card.Text>
          <Card.Text className="movie-view-info">
            Description: {movie.Description}
          </Card.Text>
          <Button onClick={() => AddToFav(movie, FavoriteMovies)}>
            Favorite
          </Button>
          <Button onClick={() => onBackClick()}>Back</Button>
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
