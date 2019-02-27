import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Alert,
  Spinner
} from 'reactstrap';

class Header extends Component {
  render() {
    const {
      username,
      blankUsernameError,
      loading,
      apiErrorMessage,
      updateUsername,
      searchUserDetails,
      dismissValidationAlert,
      dismissApiErrorAlert
    } = this.props.Store;

    return (
      <Row>
        <Col>
          {blankUsernameError ? (
            <Row>
              <Alert
                color="primary"
                isOpen={blankUsernameError}
                toggle={() => dismissValidationAlert()}
                fade={false}
              >
                Please provide GIT username
              </Alert>
            </Row>
          ) : null}
          <Row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input
                  placeholder="GIT username"
                  value={username}
                  onChange={e => updateUsername(e)}
                  onKeyPress={({ key }) =>
                    key === 'Enter' ? searchUserDetails() : null
                  }
                />
              </InputGroup>
            </Col>
            <Col>
              <Button
                color="primary"
                size="sm"
                onClick={() => searchUserDetails()}
              >
                Search
              </Button>
            </Col>
          </Row>

          {loading ? (
            <Row className="top-buffer">
              <Col>
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </Col>
            </Row>
          ) : null}

          {apiErrorMessage ? (
            <Row className="top-buffer">
              <Col>
                <Alert
                  color="danger"
                  toggle={() => dismissApiErrorAlert()}
                  fade={false}
                >
                  {apiErrorMessage}
                </Alert>
              </Col>
            </Row>
          ) : null}
        </Col>
      </Row>
    );
  }
}

export default compose(
  inject('Store'),
  observer
)(Header);
