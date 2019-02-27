import { observable, action, decorate, configure, runInAction } from 'mobx';
import axios from 'axios';

// don't allow state modifications outside actions
configure({ enforceActions: 'always' });

// Documentation is at https://developer.github.com/v3/
const GIT_BASE_URL = 'https://api.github.com';

export class GitStore {
  username = 'atiqueansari1987';
  blankUsernameError = false;
  loading = false;
  apiErrorMessage = '';
  userDetails = {};
  repositories = [];
  organizations = [];

  updateUsername = e => {
    this.username = e.target.value.trim();

    if (this.username !== '') {
      this.blankUsernameError = false;
    }
  };

  searchUserDetails = e => {
    if (this.username === '') {
      this.blankUsernameError = true;
      return;
    }

    this.blankUsernameError = false;
    this.apiErrorMessage = '';
    this.userDetails = {};
    this.repositories = [];
    this.organizations = [];
    this.loading = true;

    // Make requests to fetch user details, repositories and organizations from GIT
    const userUrl = `${GIT_BASE_URL}/users/${this.username}`;
    const repositoryUrl = `${userUrl}/repos?per_page=250`;
    const organizationUrl = `${userUrl}/orgs`;

    axios
      .all([
        axios.get(userUrl),
        axios.get(repositoryUrl),
        axios.get(organizationUrl)
      ])
      .then(([userDetails, repositories, organizations]) => {
        runInAction(() => {
          this.userDetails = userDetails.data;
          this.repositories = repositories.data;
          this.organizations = organizations.data;
          this.loading = false;
        });
      })
      .catch(({ response }) => {
        runInAction(() => {
          this.loading = false;
          this.apiErrorMessage = response.data.message;
        });
      });
  };

  dismissValidationAlert = e => {
    this.blankUsernameError = false;
  };

  dismissApiErrorAlert = e => {
    this.apiErrorMessage = '';
  };
}

const Store = (window.Store = new GitStore());

decorate(Store, {
  username: observable,
  blankUsernameError: observable,
  loading: observable,
  apiErrorMessage: observable,
  userDetails: observable,
  repositories: observable,
  organizations: observable,
  updateUsername: action,
  searchUserDetails: action,
  dismissValidationAlert: action,
  dismissApiErrorAlert: action
});

export default Store;
