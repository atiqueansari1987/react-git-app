import React, { Component } from 'react';
import { Row, Col, Table, NavLink } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

class Repository extends Component {
  render() {
    const { repositories } = this.props.Store;

    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h1>Repositories</h1>
              <hr className="bg-dark" />
            </Col>
          </Row>

          <Row>
            <Col>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {repositories.length ? (
                    repositories.map((repo, index) => (
                      <tr key={index + 1}>
                        <th>{index + 1}</th>
                        <td>
                          <NavLink href={repo.html_url} target="_blank">
                            {repo.name}
                          </NavLink>
                        </td>
                        <td>{repo.language}</td>
                        <td>{repo.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        User doesn't have any public Repositories.
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
)(Repository);
