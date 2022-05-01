import axios from 'axios';
import { useState, useEffect } from 'react';
import Square from '../Components/square.jsx';
import wordArr from '../wordArr.js';
import KakaoShare from './kakaoBtn.jsx';

import '../css/game.css';

const Game = (props) => {
  const [tried, setTried] = useState(0);
  const [history, setHistory] = useState([]);
  const [answer, setAnswer] = useState('often');
  const [correct, setCorrect] = useState(false);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState({ m: 0, s: 0 });
  const [timerId, setTimerId] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [showRank, setShowRank] = useState(false);

  useEffect(() => {
    if (correct) {
      clearInterval(timerId);
      makeAnswer();
    }
    if (showRank) {
      getRanking();
    }
  }, [correct, showRank, timerId]);

  const getRanking = async () => {
    const url = 'https://wordle-kong.herokuapp.com/api/user/ranking';

    const response = await axios.post(url);
    const { data } = response;
    const newRanking = [];
    data.forEach((v, i) => {
      let m = 0;
      let s = v.bestRecord;
      if (v.bestRecord > 60) {
        m = Math.floor(v.bestRecord / 60);
        s = v.bestRecord % 60;
      }
      newRanking[i] = (
        <tr key={`ranking${i}`}>
          <td>
            <img src={v.userImg} alt="" className="rankingImg" />
          </td>
          <td>{v.userAlias}</td>
          <td>{v.bestScore}회 시도</td>
          <td>
            {m}분 {s}초
          </td>
        </tr>
      );
    });

    setRanking(newRanking);
  };

  const makeAnswer = () => {
    const randomNum = Math.floor(Math.random() * wordArr.length);

    setAnswer(wordArr[randomNum]);
  };

  const recordScore = async () => {
    const timeRecord = timer.m * 60 + timer.s;
    const url = 'https://wordle-kong.herokuapp.com/api/user/score';
    const body = {
      idx: props.userIdx,
      score: tried + 1,
      timeRecord,
    };

    await axios.post(url, body);
  };

  const onSubmit = async (val) => {
    if (correct) {
      return;
    }

    if (val === answer) {
      await recordScore();
      await getRanking();
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
          key={i}
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

  const rankingClick = () => {
    setShowRank(!showRank);
  };

  return (
    <div className="game">
      <div className="container">
        <p>{correct ? `${tried + 1}번 만에 정답!` : `${tried}번 째 시도중`}</p>
        {correct && <KakaoShare score={tried + 1} />}
        <div onClick={rankingClick} className="ranking_btn">
          <img
            src="/public_assets/trophy.png"
            alt=""
            className="ranking_icon"
          />
          <p>랭킹보기</p>
        </div>
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
        {showRank && (
          <div className="ranking">
            <table className="ranking_tabel">
              <thead>
                <tr key="head" className="thead">
                  <td></td>
                  <td>닉네임</td>
                  <td>시도 횟수</td>
                  <td>성공 시간</td>
                </tr>
              </thead>
              <tbody>{ranking}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
