import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

class User extends Component {
  render() {
    const { userDetails } = this.props.Store;

    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h1>User</h1>
              <hr className="bg-dark" />
            </Col>
          </Row>

          <Row>
            <Col xs="1">
              <img
                className="rounded-circle img-fluid"
                src={userDetails.avatar_url}
                alt={userDetails.name}
              />
            </Col>
            <Col>
              <h2>{userDetails.name}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default compose(
  inject('Store'),
  observer
)(User);
