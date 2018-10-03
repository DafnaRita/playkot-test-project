import React from 'react';

const removeToken = () => {

};

const isExpired = () => {
  //TODO: проверяем что в SS, если истек - удаляем и возвращаем true, если нет- false
  console.log("is Expired? - ", window.sessionStorage.getItem('tokenStatus'));
  if (window.sessionStorage.getItem('tokenStatus') === 'expired') {
    return true;
  }
  return false;
};

function checkTokenExpirationHoc (WrappedComponent) {
  console.log('checkExpirationHoc start');
  return class Hoc extends React.Component {
    render() {
      return (
        <WrappedComponent isExpired={isExpired()} {...this.props}>
          {this.children}
        </WrappedComponent>
      );
    }
  }
};

export default checkTokenExpirationHoc;
