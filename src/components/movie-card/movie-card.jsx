import React from 'react';
import PropTypes from 'prop-types'
;

export class MovieCard extends React.Component{

    render(){
        const { movie, onMovieClick} = this.props;

        console.log("onMovieClick is "+typeof onMovieClick)

        return <div className='movie-card'>
            <div className='movie-title' onClick={() => {onMovieClick(movie); }}>{movie.Title}</div>
            </div>;
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