import '../css/square.css';

import { useState, useRef, useEffect } from 'react';

const Square = (props) => {
  const [values, setValues] = useState(Array(5).fill(null));

  const inputArr = [useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    inputArr[0].current.focus();
  }, [inputArr]);

  const changeValue = (i) => (e) => {
    const newValues = [...values];
    newValues[i] = e.target.value;
    if (i !== 4 && e.target.value.length === 1) {
      inputArr[i + 1].current.focus();
    }
    setValues(newValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const value = values.join('');
    props.onSubmit(value);
  };

  const pressBackSpace = (e) => {
    const {
      target: { value, id },
      key,
    } = e;
    if (value === '' && key === 'Backspace' && id !== '0') {
      inputArr[id - 1].current.focus();
    }
  };

  const renderInput = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      const inputEl = (
        <input
          type="text"
          className={props.correct ? 'square strike' : 'square'}
          onChange={changeValue(i)}
          maxLength="1"
          ref={inputArr[i]}
          key={i}
          onKeyDown={pressBackSpace}
          id={i}
        />
      );

      arr.push(inputEl);
    }
    return arr;
  };

  const renderSpan = () => {
    const arr = [];

    for (let i = 0; i < 5; i++) {
      let className = 'square out';
      if (props.history[i] === 'strike') {
        className = 'square strike';
      }

      if (props.history[i] === 'ball') {
        className = 'square ball';
      }

      const spanEl = (
        <span className={className} key={i}>
          {values[i]}
        </span>
      );
      arr.push(spanEl);
    }
    return arr;
  };

  return (
    <form className="square_row" onSubmit={submitHandler}>
      {props.check ? renderSpan() : renderInput()}

      <button type="submit" className="submitBtn"></button>
    </form>
  );
};

export default Square;
