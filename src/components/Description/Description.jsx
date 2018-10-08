import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

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

export default Description;
