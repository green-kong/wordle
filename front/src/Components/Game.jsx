import axios from 'axios';
import { useState, useEffect } from 'react';
import Square from '../Components/square.jsx';

import '../css/game.css';
const Game = (props) => {
  const [tried, setTried] = useState(0);
  const [history, setHistory] = useState([]);
  const [answer, setAnswer] = useState('often');
  const [correct, setCorrect] = useState(false);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState({ m: 0, s: 0 });
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (correct) {
      clearInterval(timerId);
    }
    makeAnswer();
  }, [correct]);

  const makeAnswer = () => {
    const arr = [
      'apple',
      'house',
      'naver',
      'sleep',
      'grape',
      'trade',
      'grade',
      'score',
      'board',
      'often',
    ];

    const randomNum = Math.floor(Math.random() * 10);

    setAnswer(arr[randomNum]);
  };

  const recordScore = async () => {
    const timeRecord = timer.m * 60 + timer.s;
    const url = 'http://localhost:4000/api/user/score';
    const body = {
      idx: props.userIdx,
      score: tried + 1,
      timeRecord,
    };

    const { data } = await axios.post(url, body);
  };

  const onSubmit = (val) => {
    console.log(answer);
    if (val === answer) {
      recordScore();
      setCorrect(true);
      return;
    }
    setTried(tried + 1);

    const log = ['out', 'out', 'out', 'out', 'out'];
    const valueArr = val.split('');
    const answerArr = answer.split('');

    for (let i = 0; i < 5; i++) {
      if (valueArr[i] === answerArr[i]) {
        log[i] = 'strike';
        answerArr[i] = 'strike';
      }
    }

    for (let i = 0; i < 5; i++) {
      if (answerArr[i] === 'strike') {
        continue;
      }

      if (answerArr.includes(valueArr[i])) {
        log[i] = 'ball';
        const idx = answerArr.indexOf(valueArr[i]);
        answerArr[idx] = false;
        continue;
      }
    }
    const newHistory = [...history];

    newHistory.push(log);
    setHistory(newHistory);
  };

  const renderSquare = () => {
    const squareArr = [];

    for (let i = 0; i < tried + 1; i++) {
      const check = tried > i ? true : false;
      squareArr.push(
        <Square
          onSubmit={onSubmit}
          correct={correct}
          check={check}
          history={history[i]}
        />
      );
    }
    return squareArr;
  };

  const restartClick = () => {
    setTried(0);
    setCorrect(false);
    setHistory([]);
    setTimer({ m: 0, s: 0 });
    clearInterval(timerId);
    timerHandler();
    makeAnswer();
  };

  const startClick = () => {
    setStart(true);
    timerHandler();
  };

  const timerHandler = () => {
    setTimerId(
      setInterval(() => {
        setTimer((timer) => {
          const newTimer = { ...timer };
          newTimer.s += 1;
          if (newTimer.s >= 60) {
            newTimer.s -= 60;
            newTimer.m += 1;
          }
          return newTimer;
        });
      }, 1000)
    );
  };

  return (
    <div className="game">
      <p>{correct ? `${tried + 1}번 만에 정답!` : `${tried}번 째 시도중`}</p>
      {start ? (
        <>
          <p className="timer">
            {timer.m} : {timer.s}
          </p>
          <button onClick={restartClick} className="restart_btn">
            Restart
          </button>
          {renderSquare()}
        </>
      ) : (
        <>
          <button onClick={startClick} className="restart_btn">
            START
          </button>
        </>
      )}
    </div>
  );
};

export default Game;
