import React from 'react';
import { Redirect } from 'react-router-dom';

import update from 'immutability-helper';

import PaginationComponent from '../PaginationComponent';
import UserInfoTable from '../UserInfoTable';

import styles from './UserList.css';

import fetchInfoHoc from '../../app/hocs/fetchInfoHoc';

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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAuthenticated: nextProps.isAuthenticated });
    if (this.state.usersOnPage.length < 1) {
      this.setState({
        usersOnPage: {
          [this.state.currentPage]: nextProps.responce,
        },
        count: nextProps.totalItems,
      });
    } else {
      this.setState({
        usersOnPage: update(this.state.usersOnPage, {
          [this.state.currentPage]: {
            $set: nextProps.responce,
          },
        }),
      });
    }
  }

  componentDidMount() {
    this.props.getItemListByOffset(0);
  }

  changePageNumber = (pageNumber) => {
    this.setState({
      currentPage: update(this.state.currentPage, { $set: pageNumber }),
    });
    if (this.state.usersOnPage[pageNumber]) {
      return;
    }

    this.props.getItemListByOffset(this.state.countUserPerPage * (pageNumber - 1));
  }

  getActiveRow = (number) => {
    console.log('мы на строке номер - ', number);
  }

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className='container'>
          <Redirect to='/auth'/>
        </div>
      );
    }

    return (
      <div className='container'>
        {<UserInfoTable
          colomnNames={['#', 'Id', 'Full Name', 'Email']}
          info={this.state.usersOnPage[this.state.currentPage]}
          getActiveRow={this.getActiveRow}
        />}
        <PaginationComponent
          totalItemsCount={this.state.count}
          itemsPerPage={this.state.countUserPerPage}
          changePageNumber={this.changePageNumber}
        />
      </div>
    );
  }
}

export default fetchInfoHoc({
  url: 'https://front-test.now.sh',
  name: 'users',
})(UserList);
