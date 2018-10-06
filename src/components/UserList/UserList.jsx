import React from 'react';
import { Link } from 'react-router-dom';

import update from 'immutability-helper';

import AccessDenied from '../AccessDenied';
import PaginationComponent from '../PaginationComponent';
import InfoTable from '../InfoTable';

import styles from './UserList.css';

import CreateAPI from '../../app/API';

//TODO move pagination and pagination's logic to HOC
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
              [this.state.currentPage]: responce,
            },
            count: responce.pagination.count,
          };
        });
      })
      .catch(({ error }) => {
        console.error(`Some error - ${error}`);
      });
  }

  fetchPageInfo = (pageNumber) => {
    this.setState({
      currentPage: update(this.state.currentPage, { $set: pageNumber }),
    });
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
      return (
        <div className='container'>
          <AccessDenied message='Please,' linkLabel='sign up'/>
        </div>
      );
    }

    return (
      <div className='container'>
        {<InfoTable
          colomnNames={['Id', 'Full Name', 'Email']}
          info={this.state.usersOnPage[this.state.currentPage]}
        />}
        <PaginationComponent
          totalItemsCount={this.state.count}
          itemsPerPage={this.state.countUserPerPage}
          fetchPageInfo={this.fetchPageInfo}
        />
      </div>
    );
  }
}

export default UserList;
