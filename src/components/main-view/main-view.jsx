import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [
                {_id:1, Title:'Inception', Description:'Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people\'s dreams and steal their secrets from their subconscious.', Genre:"Sci-fi", Director:"Christopher Nolan", ImagePath:"images/Inception.jpg"},
                {_id:2, Title:'The Sahwshank Redemption', Description:'Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison.',Genre:"Drama", Director:"Frank Darabont", ImagePath:"images/Redemption.jpg"},
                {_id:3, Title:'Gladiator', Description:'Set in Roman times, the story of a once-powerful general forced to become a common gladiator.',Genre:"Action", Director:"Ridley Scott", ImagePath:"images/Gladiator.jpg"}
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie:newSelectedMovie
        })
    }

    render(){
        const {movies, selectedMovie} = this.state;

        // if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if(movies.length === 0){return <div className="main-view">The list is empty!</div>;}


            return (
                <div className="main-view">
                    {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => (
                      <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie) }}/>
                      ))
                }
                
            </div>
            );
        
    }
}

