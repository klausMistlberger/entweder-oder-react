import React from 'react';

import classes from './ButtonAdd.module.css';

const AddOptionButton = (props) => {
  return (
    <button
      type="button"
      title="add option"
      className={`${classes['button-add']} shadow`}
      onClick={props.onClick}
    >
      +
    </button>
  );
};

export default AddOptionButton;
