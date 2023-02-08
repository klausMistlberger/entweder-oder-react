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

  const [clickCounter, setClickCounter] = useState(0);
  const [bestOfOptions, setBestOfOptions] = useState([]);

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

  const clickGoHandler = (event) => {
    event.preventDefault();
    const factor = 30;
    const seedLength = options.length * factor + 1;

    const seed = Math.floor(Math.random() * seedLength) + 1;
    const select = Math.floor(seed / factor);

    setClickCounter((count) => count + 1);

    setBestOfOptions((prevValues) => {
      const newValues = [...prevValues];

      if (select !== options.length) {
        const option = options[select].value;
        const elementToUpdate = newValues.find((el) => el.option === option);
        if (!elementToUpdate) {
          newValues.push({ id: nanoid(), option: option, count: 1 });
          return newValues;
        }
        const index = newValues.indexOf(elementToUpdate);
        newValues[index].count += 1;
        return newValues;
      }

      const noOption = 'Keine Ahnung';
      const elementToUpdate = newValues.find((el) => el.option === noOption);
      if (!elementToUpdate) {
        newValues.push({ id: nanoid(), option: noOption, count: 1 });
        return newValues;
      }
      const index = newValues.indexOf(elementToUpdate);
      newValues[index].count += 1;
      return newValues;
    });

    setOutput(() => {
      if (select === options.length) {
        return 'Keine Ahnung, wirf eine Münze!';
      }
      if (options[select].value !== '') {
        return options[select].value;
      }
      return '>> ••• <<';
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

  const bestOfResults = bestOfOptions.map((el) => {
    return (
      <p key={el.id}>
        {el.option}: {el.count}
      </p>
    );
  });

  return (
    <div className="App">
      <h1>Entweder - Oder - X</h1>
      <form className="form">
        {inputs}
        <AddOptionButton onClick={addOption} />
        <button className="result-button" onClick={clickGoHandler}>
          GO
        </button>
      </form>
      <div className="output">{output}</div>
      {clickCounter >= 2 && (
        <div className="best-of">
          <p>Best of {clickCounter + 1 + (clickCounter % 2)}</p>
          <div className="best-of-options">{bestOfResults}</div>
        </div>
      )}
      <a className="mbkrocks" href="https://klausmistlberger.rocks/">
        klausmistlberger.rocks
      </a>
    </div>
  );
};

export default App;
