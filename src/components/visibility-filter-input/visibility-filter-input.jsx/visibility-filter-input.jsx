import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../../actions/action';

import './visibility-filter.scss';

const mapStateToProps = (globalState) => {
  const { visibilityFilter } = globalState;
  return { visibilityFilter };
};

function VisibilityFilterInput(props) {
  const { setFilter, visibilityFilter } = props;
  return (
    <Form.Control
      onChange={(e) => setFilter(e.target.value)}
      value={visibilityFilter}
      placeholder="Search for movies"
      className="searchbar"
    />
  );
}

export default connect(mapStateToProps, { setFilter })(VisibilityFilterInput);
