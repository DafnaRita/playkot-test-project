import React from 'react';
import { Table } from 'reactstrap';

import PropTypes from 'prop-types';

const InfoTable = (props) => {
  const { info: usersInfo } = props;

  return (
    <div className='container-fluid'>
      <Table hover responsive size="sm">
        <thead>
          <tr>
            {
              props.colomnNames.reduce((acc, name) => {
                acc.push(<th key={`${name}`}>{name}</th>);
                return acc;
              }, [])
            }
          </tr>
        </thead>
        <tbody>
          {
            usersInfo ? (
              usersInfo.reduce((acc, user, i) => {
                acc.push(
                  <tr
                    key={user.id}
                    onClick={() => props.getActiveRow(i, user.id)}
                  >
                    <td>{ i + 1 }</td>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                  </tr>,
                );
                return acc;
              }, [])) : null
          }
        </tbody>
      </Table>
    </div>
  );
};

InfoTable.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object),
  colomnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InfoTable;
