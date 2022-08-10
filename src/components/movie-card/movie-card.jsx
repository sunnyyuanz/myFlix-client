import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component{

    render(){
        const { movie, onMovieClick} = this.props;
        let url = 'images/' + movie.ImagePath;

        console.log("onMovieClick is "+typeof onMovieClick)

        return (
        <Card>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Img src={url}></Card.Img>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => {onMovieClick(movie); }} variant="link">Open</Button>
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
            Name:PropTypes.string.isRequired,
        })
    }).isRequired,
    onMovieClick:PropTypes.func.isRequired
}