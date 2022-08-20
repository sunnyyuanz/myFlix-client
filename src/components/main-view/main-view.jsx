import React from 'react';
import axios from 'axios';
import PropType from 'prop-types';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MenuBar } from '../navbar-view/navbar';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../profile-view/updateView';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userInfo: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      this.getUserInfo(accessToken);
    }
  }

  //When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  getMovies(token) {
    axios
      .get('https://szmyflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserInfo(token) {
    let user = localStorage.getItem('user');
    if (token) {
      axios
        .get(`https://szmyflix.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            userInfo: response.data,
            FavoriteMovies: response.data.FavoriteMovies,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  RemoveFromFav(movie, FavoriteMovies) {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    if (FavoriteMovies.includes(movie._id)) {
      axios
        .delete(
          `https://szmyflix.herokuapp.com/users/${user}/collections/${movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Removed');
        })
        .catch((response) => {
          const data = response.data;
          this.setState({
            FavoriteMovies: data.FavoriteMovies,
          });
          alert('Something is wrong');
        });
    } else {
      alert('The movie is already removed!');
    }
  }

  AddToFav(movie, FavoriteMovies) {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log(FavoriteMovies);
    if (FavoriteMovies.includes(movie._id)) {
      alert('The movie is already in the list!');
    } else {
      axios
        .post(
          `https://szmyflix.herokuapp.com/users/${user}/collections/${movie._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          this.setState({
            FavoriteMovies: data.FavoriteMovies,
          });
          console.log(data);
          alert('Added to Favorite');
        })
        .catch((response) => {
          console.error(response);
          alert('Something is wrong');
        });
    }
  }

  //when a user successfully logs in, this function updates the 'user' property in state to that *particuler user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUserInfo(authData.token);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      userInfo: null,
      FavoriteMovies: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, userInfo, FavoriteMovies } =
      this.state;

    console.log(userInfo, FavoriteMovies);
    //if there is no user, the loginView is rendered. If there is a user logged in, the user details are *passed a a prop to the LoginView

    // if (!register) return <RegistrationView />;

    return (
      /*If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all *movies will be returned*/
      <Router className="main-view">
        <MenuBar user={user} />
        <p>
          Signed in as <Link to={`/users/${user}`}>{user}</Link>
        </p>
        <Row className="justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              //if there is no user, the LoginView is rendered. if there is a user logged in, the user details are *passed as a prop to the LoginView
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              //before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard
                    movie={m}
                    FavoriteMovies={FavoriteMovies}
                    AddToFav={(movie, FavoriteMovies) =>
                      this.AddToFav(movie, FavoriteMovies)
                    }
                    RemoveFromFav={(movie, FavoriteMovies) =>
                      this.RemoveFromFav(movie, FavoriteMovies)
                    }
                  />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                    AddToFav={(movie, FavoriteMovies) =>
                      this.AddToFav(movie, FavoriteMovies)
                    }
                    FavoriteMovies={FavoriteMovies}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={9}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(
                      (m) => m.Genre.Name === match.params.name
                    )}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={9}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(
                      (m) => m.Director.Name === match.params.name
                    )}
                  />
                </Col>
              );
            }}
          />
          {/* route for link on main-view to profile-view*/}
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                    userInfo={userInfo}
                    FavoriteMovies={FavoriteMovies}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/user-update/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UpdateView
                    user={user}
                    onBackClick={() => history.goBack()}
                    userInfo={userInfo}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

MovieCard.propType = {
  movie: PropType.shape({
    Title: PropType.string.isRequired,
    ImagePath: PropType.string.isRequired,
  }).isRequired,
};
