import React, { useState } from 'react';
import Input from './components/Input';
import AddOptionButton from './components/ButtonAdd';
import { nanoid } from 'nanoid';

import './App.css';

const App = () => {
  const initialState = [
    { id: nanoid(), value: '', placeholder: 'Entweder...' },
    { id: nanoid(), value: '', placeholder: '...Oder' },
  ];

  const [options, setOptions] = useState(initialState);
  const newOption = { id: nanoid(), value: '', placeholder: '...' };

  const [output, setOutput] = useState('>> ••• <<');

  const optionChangeHandler = (event) => {
    const elementToUpdate = options.find(
      (option) => option.id === event.target.id
    );

    elementToUpdate.value = event.target.value;

    const changeIndex = options.findIndex(
      (element) => element === elementToUpdate
    );

    setOptions((prevValues) => {
      const newValues = [...prevValues];
      newValues[changeIndex] = elementToUpdate;
      return newValues;
    });
  };

  const addOption = (event) => {
    event.preventDefault();
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const removeOption = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const deleteIndex = options.findIndex((element) => element.id === id);
    setOptions((prevValues) => {
      const newValues = [...prevValues];
      newValues.splice(deleteIndex, 1);
      return newValues;
    });
  };

  const calculateResult = (event) => {
    event.preventDefault();
    const factor = 30;
    const seedLength = factor * options.length + 1;

    const seed = Math.ceil(Math.random() * seedLength);
    const select = Math.floor(seed / factor);

    setOutput(() => {
      if (select === options.length) {
        return 'Keine Ahnung, wirf eine Münze!';
      } else {
        if (options[select].value !== '') {
          return options[select].value;
        } else {
          return '>> ••• <<';
        }
      }
    });
  };

  const inputs = options.map((option) => (
    <Input
      key={option.id}
      id={option.id}
      placeholder={option.placeholder}
      value={option.value}
      onChange={optionChangeHandler}
      removeOption={removeOption}
      options={options.length}
    />
  ));

  return (
    <div className='App'>
      <h1>Entweder - Oder - X</h1>
      <form className='form'>
        {inputs}
        <AddOptionButton onClick={addOption} />
        <button className='result-button' onClick={calculateResult}>
          GO
        </button>
      </form>
      <div className='output'>{output}</div>
      <a className='mbkrocks' href='https://klausmistlberger.rocks/'>
        klausmistlberger.rocks
      </a>
    </div>
  );
};

export default App;
