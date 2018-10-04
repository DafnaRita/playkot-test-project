import React from 'react';
import { Table } from 'reactstrap';

import styles from './InfoTable.css';

const InfoTable = (props) => {
  const { info: usersInfo } = props;
  /*const rows = props.data.reduce((acc, name) => {
    console.log('data row - ', name);
    acc.push(
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>,
    );
    return [];
  }, []);*/

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            {
              props.colomnNames.reduce((acc, name, i) => {
                acc.push(<th key={`${name}`}>{name}</th>);
                return acc;
              }, [])
            }
          </tr>
        </thead>
        <tbody>
          {
            usersInfo ? (
              usersInfo.data.reduce((acc, user) => {
                acc.push(<tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                </tr>);
                return acc;
              }, [])) : null
          }
        </tbody>
      </Table>
    </div>
  );
};

export default InfoTable;
