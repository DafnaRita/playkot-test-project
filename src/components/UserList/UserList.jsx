import React from 'react';
import { Link } from 'react-router-dom';

import update from 'immutability-helper';
import PaginationComponent from '../PaginationComponent';
import AccessDenied from '../AccessDenied';

import styles from './UserList.css';

import CreateAPI from '../../app/API';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: props.isAuthenticated,
      isLoading: false,
      usersOnPage: [],
      count: 0,
      countUserPerPage: 10,
      currentPage: 1,
    };
    this.api = new CreateAPI({ url: 'https://front-test.now.sh' });
    this.api.createEntity({ name: 'users' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAuthenticated: nextProps.isAuthenticated });
  }

  componentDidMount() {
    this.api.endpoints.users.getByOffset({ offset: 0 })
      .then(({ data: responce }) => {
        this.setState((previousState) => {
          return {
            ...previousState,
            usersOnPage: {
              [this.state.currentPage]: responce.data,
            },
            count: responce.pagination.count,
          };
        });
      })
      .catch(({ error }) => {
        console.error(`Some error - ${error}`);
      });
  }

  updatePageInfo = (pageNumber) => {
    if (this.state.usersOnPage[pageNumber]) {
      return;
    }

    this.api.endpoints.users.getByOffset(
      { offset: this.state.countUserPerPage * (pageNumber - 1) },
    )
      .then(({ data: responce }) => {
        this.setState({
          usersOnPage: update(this.state.usersOnPage, {
            [pageNumber]: {
              $set: responce,
            },
          }),
        });
      })
      .catch(({ error }) => {
        console.error(`Some error - ${error}`);
      });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (<AccessDenied message='Please,' linkLabel='sign up'/>);
    }

    return (
      <div>
        Users(Authenticated)
        <Link to='/auth'>Link</Link>
        {this.state.count}
        <PaginationComponent
          totalItemsCount={this.state.count}
          itemsPerPage={this.state.countUserPerPage}
          updatePageInfo={this.updatePageInfo}
        />
      </div>
    );
  }
}

export default UserList;
