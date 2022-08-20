import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

export class FavoriteCard extends React.Component {
  render() {
    const { movie } = this.props;

    let url = '../images/' + movie.ImagePath;

    return (
      <Link to={`/movies/${movie._id}`}>
        <Card key={movie._id}>
          <Card.Img src={url} />
          <Card.Title>{movie.Title}</Card.Title>
        </Card>
      </Link>
    );
  }
}
