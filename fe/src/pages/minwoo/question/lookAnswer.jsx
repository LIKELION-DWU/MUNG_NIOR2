import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  position: relative;
  overflow: hidden;

  width: 1280px;
  height: 720px;

  border: 0.5px solid #000;
  background: #fff;
  margin: 0px auto;
`;

const Logo = styled.div`
  position: relative;
  width: 50px;
  margin-top: 60px;
  margin-left: 60px;
  z-index: 999;
`;

const MenuContainer = styled.div`
  position: relative;
  margin-top: -60px;
  margin-left: 300px;

  line-height: 1;
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

  &.respond {
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

//main
const MainContainer = styled.div`
  position: relative;

  width: 1100px;
  height: 500px;

  margin-left: 75px;
  margin-top: 60px;

  border-radius: 20px;
  background: #ededed;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const User = styled.div`
  position: absolute;
  top: -10px;
  left: 54px;

  padding-left: 18px;

  width: 180px;
  height: 94px;

  border-radius: 10px 10px 5px 5px;
  background: #ff6d2e;
`;
const UserName = styled.p`
  color: #fff;
  font-family: Tmoney RoundWind;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const UserText = styled.p`
  position: relative;

  margin-top: -59px;
  margin-left: 100px;
  color: #fff;
  font-family: Tmoney RoundWind;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const MainContent = styled.div`
  position: absolute;
  top: 140px;
  left: 75px;
  background: #00ff22;

  width: 500px;
  padding: 28px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 47px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const MainImg = styled.div`
  background: #00ff22;
  position: absolute;
  right: 40px;
  top: 50px;

  height: 380px;
  width: 380px;

  border-radius: 30px;
`;

//btn
const NextBtn = styled.img`
  position: absolute;

  right: -110px;
  bottom: -40px;

  width: 28%;
`;

const LookAnswer = () => {
  const navigate = useNavigate();
  const loggedInUserNameR = localStorage.getItem("loggedInUserNameR");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const questionId = searchParams.get("question");
  console.log(questionId);

  useEffect(() => {
    const fetchQuestionInfo = async () => {
      const authToken = localStorage.getItem("TokenQ");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/my_questions/`,
          {
            headers: {
              Authorization: `Token ${authToken}`, // 사용자 토큰을 헤더에 추가
            },
          }
        );
        console.log(response.data.questions);
      } catch (error) {
        console.error("Error fetching question info:", error);
      }
    };
    fetchQuestionInfo();
  }, [questionId]);

  const GoAnswer = () => {
    navigate("/LookAnswer");
  };
  const GoLogout = () => {
    navigate("/");
  };
  const GoMyPage = () => {
    navigate("/QuestionMyPage");
  };
  const GoQuestion = () => {
    navigate("/Question");
  };
  const GoMainQ = () => {
    navigate("/MainQ");
  };

  return (
    <Container>
      <Logo>
        <img
          onClick={GoMainQ}
          src={`${process.env.PUBLIC_URL}/images_semin/logo.png`}
          alt="logo"
          width="150px"
        />
      </Logo>

      <MenuContainer>
        <Menu onClick={GoQuestion}>질문하기</Menu>
        <Menu onClick={GoAnswer} className="respond">
          답변보기
        </Menu>
        <Menu onClick={GoLogout}>로그아웃</Menu>
        <Menu onClick={GoMyPage}>질문 기록</Menu>
      </MenuContainer>

      <MainContainer>
        <User>
          <UserName>{loggedInUserNameR}</UserName>
          <UserText>답변자</UserText>
        </User>

        {/* {questionInfo ? (
          <MainContent>{questionInfo.content}</MainContent>
        ) : (
          <p>Loading question info...</p>
        )} */}

        <MainContent>
          오른쪽 그림처럼 길게 파인 곳넣으면 결제가 돼요!
        </MainContent>

        <MainImg></MainImg>
      </MainContainer>

      <NextBtn
        src={`${process.env.PUBLIC_URL}/images_minwoo/next.png`}
      ></NextBtn>
    </Container>
  );
};

export default LookAnswer;
