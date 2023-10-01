import React from 'react';
import ButtonRemove from './ButtonRemove';
import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes['input-container']}>
      <input
        type="text"
        className={`${classes.input} shadow`}
        placeholder={props.placeholder}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      />

      {props.options > 2 && (
        <ButtonRemove onRemove={props.removeOption} id={props.id} />
      )}
    </div>
  );
};

export default Input;
