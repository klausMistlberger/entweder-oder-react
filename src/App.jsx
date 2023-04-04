import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import AddOptionButton from './components/ButtonAdd';
import { nanoid } from 'nanoid';
import './App.css';

const App = () => {
  const initialOptions = [
    { id: nanoid(), value: '', placeholder: 'Entweder...' },
    { id: nanoid(), value: '', placeholder: '...Oder' },
  ];
  const initialOutput = '>> ••• <<';

  const [options, setOptions] = useState(initialOptions);
  const [output, setOutput] = useState(initialOutput);

  useEffect(() => {
    getQueryParams();
  }, []);

  const newOption = { id: nanoid(), value: '', placeholder: '...' };
  const createOption = (option) => {
    return { id: nanoid(), value: option, placeholder: '...' };
  };

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

  const getQueryParams = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const values = Object.values(params);
    if (values.length >= 2) {
      const queryOptions = values.map((value) => createOption(value));
      setOptions(queryOptions);
    }
  };

  const setQueryParams = () => {
    if (options[0].value !== '' && options[1].value !== '') {
      const queryArray = options.map(
        (option, index) => `${index}=${option.value}`
      );
      const queryString = `?${queryArray.join('&')}`;
      const url = window.location.href.split('?')[0];
      const queryUrl = url + queryString;
      window.history.replaceState(null, '', queryUrl);
    }
  };

  const clickGoHandler = (event) => {
    event.preventDefault();
    const factor = 30;
    const seedLength = options.length * factor + 1;

    const seed = Math.floor(Math.random() * seedLength) + 1;
    const select = Math.floor(seed / factor);

    setQueryParams();
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

  const clickResetHandler = () => {
    setOptions(initialOptions);
    setOutput(initialOutput);
    const url = window.location.href.split('?')[0];
    window.history.replaceState(null, '', url);
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
    <div className="App">
      <h1>Entweder - Oder - X</h1>
      <form className="form">
        {inputs}
        <AddOptionButton onClick={addOption} />
        <button className="result-button shadow" onClick={clickGoHandler}>
          GO
        </button>
      </form>
      <div className="output">{output}</div>
      <button className="reset-button shadow" onClick={clickResetHandler}>
        Reset
      </button>
      <a className="mbkrocks" href="https://klausmistlberger.rocks/">
        klausmistlberger.rocks
      </a>
    </div>
  );
};

export default App;
