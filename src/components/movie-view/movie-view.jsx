import React from "react";
import PropType from "prop-types";


export class MovieView extends React.Component{

    render(){
        const { movie, onBackClick } = this.props;
        let url="images/"+ movie.ImagePath

        console.log(typeof movie)
        console.log(typeof onBackClick)

        return (<div className="movie-view">
            <div className="movie-view-image">
                <img src={url} />
                </div>
            <div className="movie-view-title">Title: {movie.Title}</div>
            <div className="movie-view-description">Description: {movie.Description}</div>
            <div className="movie-view-Genre">Genre: {movie.Genre.Name}</div>
            <div className="movie-view-Director">Director: {movie.Director.Name}</div>
            <button onClick={() => {onBackClick(null);}}>Back</button>
        </div>
        
        );
        
    }
}

MovieView.proptype = {
    movie: PropType.shape({
        Title: PropType.string.isRequired,
        Description: PropType.string.isRequired,
        ImagePath: PropType.string.isRequired,
        Genre: PropType.shape({
            Name: PropType.string.isRequired
        }),
        Director: PropType.shape({
            Name: PropType.string.isRequired
        })

    }).isRequired,
    onBackClick: PropType.func.isRequired
};