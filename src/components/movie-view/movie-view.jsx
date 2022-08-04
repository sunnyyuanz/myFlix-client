import React from "react";


export class MovieView extends React.Component{

    render(){
        const { movie, onBackClick } = this.props;

        console.log(typeof movie)
        console.log(typeof onBackClick)

        return (<div className="movie-view">
            <div className="movie-view-image">
                <img src={movie.ImagePath} />
                </div>
            <div className="movie-view-title">Title: {movie.Title}</div>
            <div className="movie-view-description">Title: {movie.Description}</div>
            <div className="movie-view-Genre">Genre: {movie.Genre}</div>
            <div className="movie-view-Director">Director: {movie.Director}</div>
            <button onClick={() => {onBackClick(null);}}>Back</button>
        </div>
        
        );
        
    }
}