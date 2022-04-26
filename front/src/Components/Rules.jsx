import React, { useState } from 'react';
import '../css/rules.css';

import axios from 'axios';
const Rules = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  const kakaoLogin = () => {};

  return (
    <ul className="rules">
      <li>
        <h1>룰 설명</h1>
      </li>
      <li>
        <h3>1. 정답은 5글자의 알파벳입니다.(겹치는 알파벳 있을 수 있음)</h3>
      </li>
      <li>
        <h3>
          2. 다섯개의 칸에 알파벳 입력 후 엔터를 눌러서 제출 할 수 있습니다.
        </h3>
      </li>
      <li>
        <h3>3. 제출 후 결과는 아래 3가지로 나뉘어집니다.</h3>
        <ul>
          <li>초록색 : 자리와 알파벳 모두 일치</li>
          <li>노란색 : 알파벳은 일치하지만 자리는 일치하지 않음</li>
          <li>회색 : 정답에 포함되지 않은 알파벳</li>
        </ul>
      </li>
      {isLogin ? (
        <button onClick={props.startClick} className="startBtn">
          Game Start
        </button>
      ) : (
        <a href="http://localhost:4000/api/auth/kakao">
          <img
            src="/public_assets/kakao_login.png"
            alt=""
            className="kakao_btn"
            onClick={kakaoLogin}
          />
        </a>
      )}
    </ul>
  );
};

export default Rules;
