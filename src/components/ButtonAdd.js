import React from 'react';

import classes from './ButtonAdd.module.css';

const AddOptionButton = (props) => {

  return (
    <button
      title='add option'
      className={classes['button-add']}
      onClick={props.onClick}
    >
      +
    </button>
  );
};

export default AddOptionButton;
