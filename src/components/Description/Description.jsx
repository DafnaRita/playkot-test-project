import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import PropTypes from 'prop-types';

const restoreDesctiption = (data) => {
  if (!data) {
    return null;
  }
  if (data.hasOwnProperty('description')) {
    return data.description;
  }
  return null;
};

const handleDescriptionChange = saveData => (e) => {
  saveData('description', e.target.value);
};

const Description = (props) => {
  const description = restoreDesctiption(props.syncData());
  return (
    <FormGroup>
      <Label for="exampleText">Text Area</Label>
      <Input
        type="textarea"
        name="text"
        id="exampleText"
        defaultValue={description}
        onBlur={e => handleDescriptionChange(props.saveData)(e)}
      />
    </FormGroup>
  );
};

Description.propTypes = {
  saveData: PropTypes.func.isRequired,
  syncData: PropTypes.func.isRequired,
};

export default Description;
