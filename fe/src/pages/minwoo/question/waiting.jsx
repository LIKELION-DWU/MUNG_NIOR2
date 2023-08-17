import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// import { motion } from "framer-motion";
// import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;

  width: 1280px;
  height: 720px;

  border: 0.5px solid #000;
  background: #fff;
  margin: 0px auto;

  overflow-y: auto;
  overflow-x: hidden;
`;

const Logo = styled.div`
  position: relative;
  width: 50px;
  margin-top: 60px;
  margin-left: 60px;
  z-index: 999;

  :hover {
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  position: fixed;
  width: 788px;
  height: 85px;
  padding-top: 40px;

  margin-top: -78px;
  margin-left: 480px;
  background: rgba(255, 255, 255, 0.78);

  line-height: 1;
  z-index: 5;
`;

const Menu = styled.div`
  position: relative;
  display: inline-block;

  margin-left: 90px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;

  &.question {
    position: relative;
    border-bottom: 4px solid #000;
    padding-bottom: 4px;
  }

  &:hover {
    cursor: pointer;
    color: #ff6d2e;
    border-bottom-color: #ff6d2e;
  }
`;

const TextWait = styled.h1`
  margin-top: -220px;
  height: 40px;

  color: #ff6d2e;
  text-align: center;
  font-family: Tmoney RoundWind;
  font-size: 55px;
  font-style: normal;
  font-weight: 800;
  line-height: 100px; /* 100% */
`;
const H1 = styled.div`
  margin-left: 430px;

  color: #000;
  font-family: Tmoney RoundWind;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 100px;
  letter-spacing: -4.8px;
`;

const TypingEffect = () => {
  const textToType = ". . .";
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [repeatCount, setRepeatCount] = useState(0);

  const navigate = useNavigate();

  const H1 = styled.h1`
    color: #000;
    font-family: Tmoney RoundWind;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 100px;
    letter-spacing: -4.8px;

    text-aligin: center;
  `;

  const Div = styled.div`
    margin-top: -120px;
    margin-left: 820px;
  `;

  useEffect(() => {
    if (repeatCount < 3) {
      if (currentIndex < textToType.length) {
        const typingTimeout = setTimeout(() => {
          setTypedText(textToType.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, 230); // 100ms 간격으로 타이핑 효과 생성

        return () => clearTimeout(typingTimeout);
      } else {
        setTimeout(() => {
          setTypedText("");
          setCurrentIndex(0);
          setRepeatCount(repeatCount + 1);
        }, 1400); // 0.5초 대기 후 다시 타이핑 시작

        if (repeatCount === 2) {
          navigate("/QuestionMyPage");
        }
      }
    }
  }, [currentIndex, repeatCount]);

  return (
    <Div>
      <H1>{typedText}</H1>
    </Div>
  );
};

const Waiting = () => {
  const Div = styled.div`
    margin-top: 50px;
  `;

  return (
    <Container>
      <Logo>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/logo.png`}
          alt="logo"
          width="150px"
        />
      </Logo>
      <MenuContainer>
        <Menu className="design">질문하기</Menu>
        <Menu>로그아웃</Menu>
        <Menu>질문 기록</Menu>
      </MenuContainer>

      <Div>
        <svg width="1300" height="480">
          <path
            id="path"
            d="M-59.1035 373.961C149.328 318.396 381.362 266.032 558.972 189.673C627.378 160.263 667.005 127.51 687.823 87.9955C707.468 50.7086 702.039 12.3157 605.396 4.72741C546.351 0.0912156 474.938 4.30223 424.864 22.8598C360.345 46.7709 347.613 85.032 345.242 118.381C341.531 170.581 362.022 241.118 480.395 263.653C538.812 274.774 609.841 275.415 673.705 275.823C781.068 276.509 889.482 273.262 997.118 267.19C1164.17 257.767 1335.19 242.585 1493.45 212.11C1580.23 195.4 1667.28 176.109 1742.58 149.712C1807.16 127.074 1853.37 99.8643 1895.15 69.0651M1895.15 69.0651C1930.88 42.721 1871.06 97.2943 1895.15 69.0651Z"
            fill="none"
            stroke="#FF7C43"
            strokeWidth="3.5"
            stroke-linecap="round"
            stroke-dasharray="10 10"
          ></path>
          <image
            x="-200"
            y="-124"
            width="330"
            height="330"
            xlinkHref={`${process.env.PUBLIC_URL}/images_minwoo/airplane.png`}
          >
            <animateMotion dur="2.5s" repeatCount="indefinite">
              <mpath href="#path" />
            </animateMotion>
          </image>
        </svg>
      </Div>

      <TextWait>잠시만 기다려주세요</TextWait>
      <H1>봉사자들이 질문을 확인 중 입니다</H1>
      <TypingEffect />
    </Container>
  );
};

export default Waiting;
