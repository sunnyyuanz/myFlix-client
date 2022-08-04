import React from 'react';

export class MovieCard extends React.Component{

    render(){
        const { movie, onMovieClick} = this.props;

        console.log("onMovieClick is "+typeof onMovieClick)

        return <div className='movie-card'>
            <div className='movie-title' onClick={() => {onMovieClick(movie); }}>{movie.Title}</div>
            </div>;
    }
}