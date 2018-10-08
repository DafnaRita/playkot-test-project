import React from 'react';

import PropTypes from 'prop-types';

function sessionDataSaver (WrappedComponent) {
  const hoc = class sessionDataSaverHoc extends React.PureComponent {
    constructor(props) {
      super();
      this.state = {
        dataId: props.location.state.id,
      };
    }

    saveData = (newKey, additionalValue) => {
      let data = JSON.parse(window.sessionStorage.getItem(this.state.dataId));
      window.sessionStorage.removeItem(this.state.dataId);
      if (!data) {
        data = {};
      }
      data[newKey] = additionalValue;
      window.sessionStorage.setItem(this.state.dataId, JSON.stringify(data));
    }

    syncData = () => JSON.parse(window.sessionStorage.getItem(this.state.dataId));

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          saveData={this.saveData}
          syncData={this.syncData}
        >
          {this.children}
        </WrappedComponent>
      );
    }
  };
  return hoc;

  hoc.propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };
};

export default sessionDataSaver;
