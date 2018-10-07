import React from 'react';
import { withRouter } from 'react-router';

import CreateAPI from '../API';

const fetchInfo = anotherProps => (WrappedComponent) => {
  return class fetchInfoHoc extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        responce: null,
        totalItems: null,
        error: null,
      };
      this.endpointsName = anotherProps.name;
      this.api = new CreateAPI({ url: anotherProps.url });
      this.api.createEntity({ name: this.endpointsName });
    }

    getItemListByOffset = (newOffset) => {
      this.api.endpoints[this.endpointsName].getByOffset({ offset: newOffset })
        .then(({ data: responce }) => {
          this.setState(() => ({
            responce: responce.data,
            totalItems: responce.pagination.count,
          }));
        })
        .catch(({ error }) => {
          this.setState(() => ({ error }));
          console.error(`Some error - ${error}`);
        });
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          responce={this.state.responce}
          getItemListByOffset={this.getItemListByOffset}
          totalItems={this.state.totalItems}>
          {this.children}
        </WrappedComponent>
      );
    }
  };
};

export default fetchInfo;
