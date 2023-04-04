import React from 'react';
import classes from './ButtonRemove.module.css';

const ButtonRemove = (props) => {
  return (
    <button
      title="remove option"
      onClick={props.onRemove}
      data-id={props.id}
      className={`${classes['remove-button']} shadow`}
    >
      -
    </button>
  );
};

export default ButtonRemove;
