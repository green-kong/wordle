import React, { useEffect } from 'react';

import '../css/kakao.css';

const KakaoShare = (props) => {
  const url = window.location.href; //현재 url가져오기
  useEffect(() => {
    initKakao(); //
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('d237771033c5a85896cf9299be47f483');
      }
    }
  };

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '알파벳 야구게임 Wordle',
        description: `나는 ${props.score}번만에 성공했음! 너는 몇 번만에 할 수 있을까?`,
        imageUrl: 'https://ifh.cc/g/kOKxN5.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div className="share-node" onClick={shareKakao}>
      <img
        src="/public_assets/kakao_share_btn.png"
        alt="카카오공유"
        className="kakao_share_btn"
      />
      <p className="kakao_share_btn_title">친구에게 자랑하기</p>
    </div>
  );
};

export default KakaoShare;
