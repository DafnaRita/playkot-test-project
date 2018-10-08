import React from 'react';
import { withRouter } from 'react-router';

const isExpired = () => {
  const sessionInfo = JSON.parse(window.sessionStorage.getItem('sessionInfo'));
  if (!sessionInfo) {
    return true;
  }
  if ((Date.now() - sessionInfo.tokenObj.expires_at) < 0) {
    return false;
  }
  return true;
};

function sessionControlHoc(WrappedComponent) {
  const hoc = class SessionControlHoc extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        isAuthenticated: false,
        user: null,
      };
    }

    componentWillMount() {
      const sessionInfo = JSON.parse(window.sessionStorage.getItem('sessionInfo'));
      if (sessionInfo !== null && typeof sessionInfo === 'object' && !isExpired()) {
        this.setState(() => {
          return {
            isAuthenticated: true,
            user: {
              email: sessionInfo.profileObj.email,
              name: sessionInfo.profileObj.name,
              imageUrl: sessionInfo.profileObj.imageUrl,
            },
          };
        });
      }
    }

    componentWillUpdate() {
      if (isExpired()) {
        this.setState(() => {
          return {
            isAuthenticated: false,
            user: null,
          };
        });
      }
    }

    login = (info) => {
      console.log('login');
      window.sessionStorage.setItem('sessionInfo', JSON.stringify(info));
      this.setState(() => {
        return {
          isAuthenticated: true,
          user: {
            email: info.profileObj.email,
            name: info.profileObj.name,
            imageUrl: info.profileObj.imageUrl,
          },
        };
      });
    }

    logout = () => {
      console.log('logout');
      window.sessionStorage.removeItem('sessionInfo');
      this.setState(() => {
        return {
          isAuthenticated: false,
          user: null,
        };
      });
    }

    render() {
      return (
        <WrappedComponent
          isAuthenticated={ !isExpired() && this.state.isAuthenticated }
          login={this.login}
          logout={this.logout}
          user={this.state.user}
          {...this.state}
          {...this.props}>
          {this.children}
        </WrappedComponent>
      );
    }
  };
  return withRouter(hoc);
};

export default sessionControlHoc;
