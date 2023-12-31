import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  width: 788px;
  height: 85px;
  padding-top: 40px;

  margin-top: -80.5px;
  margin-left: 461px;
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

  border-radius: 0px 150px 0px 0px;
  background: linear-gradient(
    180deg,
    rgba(255, 109, 46, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const MainUser = () => {
  const loggedInUserNameQ = localStorage.getItem("loggedInUserNameQ");
  const QuestionLength =
    JSON.parse(localStorage.getItem("QuestionLength")) || 0;

  const progressBarIncrement = 2;

  const percentage = Math.min(QuestionLength * progressBarIncrement, 100);

  const progressBarStyles = {
    path: {
      stroke: `#FF6D2E`, // 프로그래스 바 채우는 부분의 색상
    },
    trail: {
      stroke: "#FFF", // 프로그래스 바의 빈 부분의 색상
    },
    background: {
      fill: "#fff", // 배경색
    },
  };

  const UserBox = styled.div`
    width: 300px;
    height: 300px;

    margin-left: 100px;
    margin-top: 70px;
  `;
  //답변자 이름 받아오는 부분
  const UserName = styled.div`
    margin-top: 30px;

    color: #404040;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 28px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  `;

  return (
    <UserBox>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={progressBarStyles}
        strokeWidth={6}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images_minwoo/user.png`}
          alt="사용자"
          width="290px"
        />
      </CircularProgressbarWithChildren>
      <UserName>{loggedInUserNameQ}</UserName>
      <div
        style={{
          color: "#404040",
          fontFamily: "Noto Sans KR",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          marginLeft: "120px",
        }}
      >
        질문자
      </div>
    </UserBox>
  );
};

const MainTitle = styled.div`
  position: relative;

  width: 500px;

  margin-top: -320px;
  margin-left: 500px;

  color: #404040;
  font-family: Noto Sans KR;
  font-size: 33px;
  font-style: bold;
  font-weight: 900;
  line-height: normal;
`;
const MainListBox = styled.div`
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  width: 700px;
  height: 250px;

  margin-left: 470px;
  padding: 20px;
  padding-top: 20px;
`;

const List = ({ question }) => {
  const navigate = useNavigate();

  console.log("question: ", question.answers.comment);

  const GoRecord = (questionId) => {
    console.log("go");
    navigate(`/LookAnswer?question=${encodeURIComponent(questionId)}`);
  };

  {
    /*const GoWaitAnswer = () => {
    navigate("/WaitAnswer");
  }*/
  }

  const ListWhite = styled.div`
    position: relative;

    width: 630px;
    height: 48px;

    padding-top: 15px;
    padding-left: 26px;
    margin-top: 20px;

    border-radius: 20px;
    background: #fff;
  `;
  const ListContent = styled.div`
    white-space: no-wrap;
    overflow: hidden;
    text-overflow: ellipsis;

    height: 70px;
    width: 540px;

    color: #404040;
    font-family: Noto Sans KR;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;
  const ListBtn = styled.img`
    position: absolute;

    width: 130px;

    bottom: -12px;
    right: -38px;
  `;

  return (
    <ListWhite>
      <ListContent>{question.content}</ListContent>
      <ListBtn
        onClick={() => GoRecord(question.id)}
        src={`${process.env.PUBLIC_URL}/images_minwoo/next.png`}
      ></ListBtn>
    </ListWhite>
  );
};

const QuestMy = () => {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState([]);
  //08/16

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem("TokenQ");
        console.log(authToken);

        const response = await axios.get(
          "http://127.0.0.1:8000/my_questions/",
          {
            headers: {
              Authorization: `Token ${authToken}`, // 사용자 토큰을 헤더에 추가
            },
          }
        );

        console.log(response);

        const QuestionLength = response.data.questions.length;
        localStorage.setItem("QuestionLength", QuestionLength);

        const questionData = response.data.questions; // "questions" 필드를 직접 가져옴
        setQuestionData(questionData);
      } catch (error) {
        console.error("첫번째 오류 발생:", error);
      }
    };
    fetchUserInfo();
  }, []);

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
  const QuestionLength = localStorage.getItem("QuestionLength");

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
        <Menu onClick={GoLogout}>로그아웃</Menu>
        <Menu onClick={GoMyPage} className="design">
          질문 기록
        </Menu>
      </MenuContainer>
      <MainContainer>
        <MainUser />
        <MainTitle>질문을 기록합니다 ({QuestionLength}) </MainTitle>
        <MainListBox>
          {questionData.length > 0 ? (
            questionData.map((question) => (
              <List key={question.id} question={question} />
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </MainListBox>
      </MainContainer>
    </Container>
  );
};

export default QuestMy;
