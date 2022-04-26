import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { checkCookie, clearCookie } from '../util/cookie.js';

import '../css/rules.css';

const Rules = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const kakaoLogin = async () => {
    const url = 'http://localhost:4000/api/auth/kakao';
    await axios.get(url);
  };

  useEffect(() => {
    (async function () {
      const user = await checkCookie();
      if (!user) {
        return;
      }
      setIsLogin(user);
    })();
  }, []);

  const startClick = () => {
    props.startClick(isLogin.u_id);
  };

  const logoutClick = () => {
    clearCookie();
    setIsLogin(false);
  };

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
        <>
          <p>🎉 {isLogin.userAlias}님 환영합니다 🎉</p>
          <p>🎖 {isLogin.userAlias}님의 최고기록🎖</p>
          {isLogin.bestScore > 0 ? (
            <p>
              <span className="bestScore">{isLogin.bestScore}</span>회 만에
              성공!
            </p>
          ) : (
            <p>도전해보세요!</p>
          )}
          <div className="btn_container">
            <button onClick={logoutClick} className="logoutBtn">
              로그아웃
            </button>
            <button onClick={startClick} className="startBtn">
              Game Start
            </button>
          </div>
        </>
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
