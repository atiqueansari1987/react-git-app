import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';
import { Container, Row } from 'reactstrap';
import Header from './components/Header';
import Organization from './components/Organization';
import Repository from './components/Repository';
import User from './components/User';

class App extends Component {
  render() {
    const { userDetails } = this.props.Store;

    return (
      <Container>
        <Row className="top-buffer" />
        <Header />
        <Row className="middle-buffer" />
        {Object.keys(userDetails).length > 0 ? (
          <>
            <User />
            <Row className="middle-buffer" />
            <Repository />
            <Row className="middle-buffer" />
            <Organization />
          </>
        ) : null}
      </Container>
    );
  }
}

export default compose(
  inject('Store'),
  observer
)(App);
