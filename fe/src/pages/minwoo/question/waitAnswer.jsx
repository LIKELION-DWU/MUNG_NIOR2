import React from "react";
import styled from "styled-components";
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

// 상단바
const Logo = styled.div`
  position: relative;

  width: 50px;
  margin-top: 60px;
  margin-left: 60px;
  z-index: 999;
`;
const MenuContainer = styled.div`
  position: fixed;
  width: 1000px;
  height: 85px;
  padding-top: 40px;

  margin-top: -78px;
  margin-left: 270px;
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

  &.design {
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

//메인
const MainContainer = styled.div`
  width: 1280px;
  height: 450px;

  margin-top: 70px;
  padding-top: 20px;
`;

const Img = styled.img`
  margin-left: 400px;
  margin-top: -80px;
`;
const H1 = styled.h1`
  margin-top: -43px;

  color: #ff6d2e;
  text-align: center;
  font-family: Tmoney RoundWind;
  font-size: 55px;
  font-style: normal;
  font-weight: 800;
  line-height: 100px; /* 100% */
`;
const P = styled.p`
  margin-top: -60px;
  margin-left: 380px;

  color: #000;
  font-family: Tmoney RoundWind;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 100px;
  letter-spacing: -4.8px;
`;
const Button = styled.img`
  width: 230px;

  margin-top: -60px;
  margin-left: 520px;
`;

const WaitAnswer = () => {
  const navigate = useNavigate();

  const GoLogout = () => {
    navigate("/");
  };
  const GoMyPage = () => {
    navigate("/QuestionMyPage");
  };
  const GoQuestion = () => {
    navigate("/Question");
  };

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
        <Menu onClick={GoQuestion}>질문하기</Menu>
        <Menu className="design">답변보기</Menu>
        <Menu onClick={GoLogout}>로그아웃</Menu>
        <Menu onClick={GoMyPage}>질문 기록</Menu>
      </MenuContainer>
      <MainContainer>
        <Img src="/images_minwoo/bell.png" width="450px" />
        <H1>아직 답변을 확인 중입니다</H1>
        <P>답변이 작성되면 문자로 알림을 보내드립니다.</P>
      </MainContainer>

      <Button onClick={GoMyPage} src="/images_minwoo/yes.png"></Button>
    </Container>
  );
};

export default WaitAnswer;
