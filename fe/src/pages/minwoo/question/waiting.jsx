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
  margin-left: 480px;

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

    text-align: center;
  `;

  const Div = styled.div`
    margin-top: -120px;
    margin-left: 300px;
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
        <svg width="600" height="480">
          <path
            id="path"
            d="M-76.8892 385.52C38.2658 325.585 167.371 268.305 262.715 188.38C299.436 157.597 319.2 124.133 327.444 84.3661C335.223 46.841 328.402 8.7779 271.809 3.39645C237.233 0.108559 196.356 5.89709 169.191 25.4762C134.189 50.7036 130.499 89.0426 132.328 122.264C135.19 174.264 153.801 243.959 224.389 263.72C259.224 273.471 300.345 272.517 337.301 271.492C399.428 269.769 461.786 264.11 523.423 255.659C619.084 242.543 716.485 223.611 805.048 189.754C853.61 171.19 902.074 150.053 943.071 122.112C978.232 98.1488 1002.33 70.0512 1023.53 38.4827M1023.53 38.4827C1041.66 11.4807 1012.31 67.0987 1023.53 38.4827Z"
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
      <H1>답변을 가져오는 중입니다</H1>
      <TypingEffect />
    </Container>
  );
};

export default Waiting;
