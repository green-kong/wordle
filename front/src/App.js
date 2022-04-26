import { useState } from 'react';

import Rules from './Components/Rules.jsx';
import Game from './Components/Game.jsx';

import './App.css';

const App = () => {
  const [start, setStart] = useState(false);
  const [userIdx, setUserIdx] = useState(false);
  const startClick = (userIdx) => {
    setUserIdx(userIdx);
    setStart(true);
  };

  return (
    <div className="App">
      {start ? <Game userIdx={userIdx} /> : <Rules startClick={startClick} />}
    </div>
  );
};

export default App;
