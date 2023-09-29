import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import '@theme-toggles/react/css/Expand.css';
import { Expand } from '@theme-toggles/react';
import { nanoid } from 'nanoid';
import AddOptionButton from './components/ButtonAdd';
import Input from './components/Input';

const App = () => {
  const initialOptions = [
    { id: nanoid(), value: '', placeholder: 'Either ...' },
    { id: nanoid(), value: '', placeholder: '... Or' },
  ];
  const initialOutput = '•••';

  const [options, setOptions] = useState(initialOptions);
  const [output, setOutput] = useState(initialOutput);

  const getQueryParams = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const values = Object.values(params);
    if (values.length >= 2) {
      const queryOptions = values.map((value) => createOption(value));
      setOptions(queryOptions);
    }
  }, []);

  const getInitialDarkMode = () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode !== null ? JSON.parse(savedDarkMode) : true;
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    getQueryParams();
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) setDarkMode(savedDarkMode);
  }, [getQueryParams]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    darkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  }, [darkMode]);

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

  const createQueryUrl = () => {
    const queryArray = options.map(
      (option, index) => `${index}=${option.value}`
    );
    const queryString = `?${queryArray.join('&')}`;
    const url = window.location.href.split('?')[0];
    const queryUrl = url + queryString;
    return queryUrl;
  };

  const setQueryParams = () => {
    if (options[0].value !== '' && options[1].value !== '') {
      const queryUrl = createQueryUrl();
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
      return initialOutput;
    });
  };

  const clickResetHandler = () => {
    setOptions(initialOptions);
    setOutput(initialOutput);
    const url = window.location.href.split('?')[0];
    window.history.replaceState(null, '', url);
  };

  const clickShareHandler = () => {
    let shareData = {
      title: 'Entweder - Oder - X',
      text: 'https://eo.klausmistlberger.rocks/',
      url: 'https://eo.klausmistlberger.rocks/',
    };

    try {
      if (options[0].value !== '' && options[1].value !== '') {
        shareData.text = createQueryUrl();
        shareData.url = createQueryUrl();
        navigator.share(shareData);
      } else {
        navigator.share(shareData);
      }
    } catch (error) {
      alert('Sharing not supported');
    }
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
      <header>
        <Expand
          duration={750}
          className="theme-toggle"
          toggled={darkMode}
          toggle={setDarkMode}
        />
      </header>
      <h1>E O X</h1>

      <form className="form">
        {inputs}
        <AddOptionButton onClick={addOption} />
        <button className="result-button shadow" onClick={clickGoHandler}>
          GO
        </button>
      </form>
      <div className="output">{output}</div>

      <div className="utility-button-container">
        <button
          className="utility-button reset-button shadow"
          onClick={clickResetHandler}
        >
          Reset
        </button>
        <button
          className="utility-button share-button shadow"
          onClick={clickShareHandler}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default App;
