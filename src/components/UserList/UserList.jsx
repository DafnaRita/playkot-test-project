import React from 'react';
import { Redirect } from 'react-router-dom';

import update from 'immutability-helper';

import PropTypes from 'prop-types';

import PaginationComponent from '../PaginationComponent';
import InfoTable from '../InfoTable';

import fetchInfoHoc from '../../app/hocs/fetchInfoHoc';

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
    if (this.state.isAuthenticated) {
      this.props.getItemListByOffset(0);
    }
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

  getActiveRow = (i, id) => {
    this.props.history.push({
      pathname: `/users/${id}`,
      state: this.state.usersOnPage[this.state.currentPage][i],
    });
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
        {<InfoTable
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

UserList.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  responce: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.arrayOf(PropTypes.string),
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    fullName: PropTypes.string,
  })),
  history: PropTypes.object.isRequired,
  getItemListByOffset: PropTypes.func.isRequired,
  totalItems: PropTypes.number,
};

export default fetchInfoHoc({
  url: 'https://front-test.now.sh',
  name: 'users',
})(UserList);
