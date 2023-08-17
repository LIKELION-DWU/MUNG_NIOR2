import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./CustomScrollbar.css";
import axios from "axios";

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

  margin-top: -86.5px;
  margin-left: 461px;
  background: rgba(255, 255, 255, 0.78);

  line-height: 1;
  z-index: 5;
`;

const Menu = styled.div`
  position: relative;
  display: inline-block;

  margin-left: 90px;

  color: #7e7c7c;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  &:hover {
    cursor: pointer;
    color: #ff6d2e;
  }
`;

const Images = styled.div`
  position: relative;

  margin-top: 65px;
  left: 180px;

  width: 200px;
`;

const DotsContainer = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
  top: -5px;
`;

const Dots = styled.div`
  position: relative;
  display: flex;
  top: -25px;
  left: 200px;
  z-index: 999;

  width: 11px;
  height: 11px;

  border-radius: 50%;
  background-color: white;
  margin-right: 10px;
  background-color: ${({ active }) =>
    active ? "white" : "rgba(255, 255, 255, 0.5)"};
`;

const Orangebox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 800px;
  height: 83px;
  flex-shrink: 0;

  left: 481px;
  top: -60px;
  margin-bottom: 70px;

  border-radius: 150px 0px 0px 10px;
  background: #ff6d2e;

  color: #fff;
  text-align: center;
  font-family: Tmoney RoundWind;
  font-size: 27px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Breakthrough = styled.div`
  position: relative;

  top: 80px;
  left: 130px;
`;

const Frame = styled.div`
  position: relative;

  top: -200px;
  left: 530px;
`;

const Light = styled.div`
  position: relative;

  top: -400px;
  left: 130px;
`;

const RectangleK = styled.div`
  position: relative;

  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: -200px;

  width: 1150px;
  height: 280px;

  border-radius: 109.119px;
  background: #fff;
  box-shadow: 0px 0px 25px 2px rgba(0, 0, 0, 0.15);

  img + img {
    margin-left: 40px;
  }

  z-index: 100;
`;

const RectangleGray = styled.div`
  position: relative;
  top: -150px;

  width: 1280px;
  height: 1400px;

  border-radius: 0px 150px 0px 0px;
  background: linear-gradient(
    180deg,
    rgba(186, 186, 186, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  img {
    position: relative;
    top: 370px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: auto;
  }

  img + img {
    margin-top: 60px;
  }
`;

const MainQ = () => {
  const navigate = useNavigate();

  const gotoQuestionMyPage = () => {
    navigate("/QuestionMyPage");
  };

  const gotoQuestion = () => {
    navigate("/Question");
  };
  const gotoPreMain = () => {
    navigate("/");
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 점 클릭 -> 이미지
  const handleDotClick = (index) => {
    setSelectedImageIndex(index);
    setCurrentIndex(index);
  };

  // 이미지 배열
  const images = [
    `${process.env.PUBLIC_URL}/images_semin/image1.png`,
    `${process.env.PUBLIC_URL}/images_semin/image2.png`,
    `${process.env.PUBLIC_URL}/images_semin/image3.png`,
  ];

  // 이미지 바뀌기 -> 마지막 사진이면 처음으로
  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 3.5초마다 변경
  useEffect(() => {
    const slideshowInterval = setInterval(changeImage, 3500);

    return () => clearInterval(slideshowInterval);
  }, []);

  useEffect(() => {
    setSelectedImageIndex(currentIndex);
  }, [currentIndex]);

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
        <Menu onClick={gotoQuestion}>질문하기</Menu>
        <Menu onClick={gotoPreMain}>로그아웃</Menu>
        <Menu onClick={gotoQuestionMyPage}>질문 기록</Menu>
      </MenuContainer>
      <Images>
        <img
          src={images[currentIndex]}
          alt={`image${currentIndex + 1}`}
          width="1100px"
          height="500px"
        />
      </Images>
      <DotsContainer>
        {images.map((_, index) => (
          <Dots
            key={index}
            onClick={() => handleDotClick(index)}
            active={index === selectedImageIndex}
          />
        ))}
      </DotsContainer>
      <Orangebox>알고 싶은 만큼 질문해주세요. 자세히 알려드립니다.</Orangebox>
      <Breakthrough>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/breakthrough.png`}
          alt="breakthrough"
          width="380px"
        />
      </Breakthrough>
      <Frame>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/Frame 52.png`}
          alt="frame"
          width="670px"
          height="620px"
        />
      </Frame>
      <Light>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/light.png`}
          alt="light"
          width="350px"
          height="280px"
        />
      </Light>
      <RectangleK>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/kioskimg.png`}
          alt="kioskimg"
          width="650px"
          height="130px"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/kioskATM.png`}
          alt="kioskATM"
          width="230px"
          height="150px"
        />
      </RectangleK>
      <RectangleGray>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/answertext.png`}
          alt="answertext"
          width="480px"
          height="130px"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/howto.png`}
          alt="howto"
          width="150px"
          height="50px"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/howtoDetail.png`}
          alt="howtoDetail"
          width="700px"
          height="700px"
        />
      </RectangleGray>
    </Container>
  );
};

export default MainQ;
