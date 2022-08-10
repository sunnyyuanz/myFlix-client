import React from 'react';
import PropType from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    let url = 'images/' + movie.ImagePath;

    console.log(typeof movie);
    console.log(typeof onBackClick);

    return (
      <Card className="movie-view">
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Img src={url}></Card.Img>
          <Card.Text className="movie-view-Genre">
            Genre: {movie.Genre.Name}
          </Card.Text>
          <Card.Text className="movie-view-Director">
            Director: {movie.Director.Name}
          </Card.Text>
          <Card.Text className="movie-view-info">
            Description: {movie.Description}
          </Card.Text>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.proptype = {
  movie: PropType.shape({
    Title: PropType.string.isRequired,
    Description: PropType.string.isRequired,
    ImagePath: PropType.string.isRequired,
    Genre: PropType.shape({
      Name: PropType.string.isRequired,
    }),
    Director: PropType.shape({
      Name: PropType.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropType.func.isRequired,
};
