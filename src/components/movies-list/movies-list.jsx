import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (globalState) => {
  const { visibilityFilter } = globalState;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, FavoriteMovies, AddToFav, RemoveFromFav } =
    props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      {filteredMovies.map((m) => (
        <Col md={3} key={m.id}>
          <MovieCard
            movie={m}
            FavoriteMovies={FavoriteMovies}
            AddToFav={AddToFav}
            RemoveFromFav={RemoveFromFav}
          />
        </Col>
      ))}
      ;
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
