import React from "react";
import axios from "axios";
import PropType from "prop-types";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";


export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user:null,
            register:true,
        };

    }

    componentDidMount(){
        axios.get('https://szmyflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    //When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie
    setSelectedMovie(movie){
        this.setState({
            selectedMovie:movie
        })
    }

    //when a user successfully logs in, this function updates the 'user' property in state to that *particuler user
    onLoggedIn(user){
        this.setState({
            user,
            register:true
        });
    }

   

    
    render(){
        const {movies, selectedMovie, user, register} = this.state;
    

        //if there is no user, the loginView is rendered. If there is a user logged in, the user details are *passed a a prop to the LoginView
        if(!user)return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

        if(!register)return <RegistrationView />;



        if(movies.length === 0)return <div className="main-view" />;


            return (
                <div className="main-view">
                {/*If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                    {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => (
                      <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie) }}/>
                      ))
                }
                
            </div>
            );
        
    }
}

MovieCard.propType = {
        movie: PropType.shape({
            Title: PropType.string.isRequired,
            ImagePath: PropType.string.isRequired,    
        }).isRequired,
}