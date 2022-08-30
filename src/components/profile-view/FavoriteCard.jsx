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

import './profile-view.scss';

export class FavoriteCard extends React.Component {
  render() {
    const { movie } = this.props;

    let url = '../images/' + movie.ImagePath;

    return (
      <Link to={`/movies/${movie._id}`}>
        <Card key={movie._id} className="FavMovie-Card">
          <Card.Img src={url} />
          <Card.Title className="FavMovie-CardTitle">{movie.Title}</Card.Title>
        </Card>
      </Link>
    );
  }
}
