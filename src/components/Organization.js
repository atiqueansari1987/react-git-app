import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

class Organization extends Component {
  render() {
    const { organizations } = this.props.Store;

    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h1>Organizations</h1>
              <hr className="bg-dark" />
            </Col>
          </Row>

          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.length ? (
                    organizations.map((org, index) => (
                      <tr key={index + 1}>
                        <th>{index + 1}</th>
                        <td>{org.login}</td>
                        <td>{org.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        User doesn't have any public Organizations.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
)(Organization);
