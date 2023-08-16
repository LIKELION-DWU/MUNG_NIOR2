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
  position: relative;
  margin-top: -60px;
  margin-left: 490px;

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
    rgba(176, 173, 173, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const MainUser = () => {
  const loggedInUserNameR = localStorage.getItem("loggedInUserNameR");
  const percentage = 2;

  const progressBarStyles = {
    path: {
      stroke: `#FF6D2E`, // 프로그래스 바 채우는 부분의 색상
    },
    trail: {
      stroke: "#D9D9D9", // 프로그래스 바의 빈 부분의 색상
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
      <UserName>{loggedInUserNameR}</UserName>
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
        답변자
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

const fetchAnswers = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/my_answers/");
    return response.data;
  } catch (error) {
    console.error("Error fetching answers:", error);
    return [];
  }
};

const List = ({ answerContent }) => {
  const navigate = useNavigate();

  const GoRecord = () => {
    console.log("go");
    navigate("/Record");
  };

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
    width: 540px; /* 원하는 가로 길이로 설정 */
    white-space: nowrap; /* 한 줄로 글이 표시되도록 설정 */
    overflow: hidden; /* 넘치는 부분을 감춤 */
    text-overflow: ellipsis; /* 넘치는 부분을 생략 부호로 표시 */

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
      <ListContent>{answerContent}</ListContent>
      <ListBtn
        onClick={GoRecord}
        src={`${process.env.PUBLIC_URL}/images_minwoo/next.png`}
      ></ListBtn>
    </ListWhite>
  );
};

//버튼
const MoreBtn = styled.button`
  width: 170px;
  height: 60px;

  margin-left: 750px;
  margin-top: -30px;

  border: none;
  border-radius: 20px;
  background: #ff6d2e;

  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 25px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const ResMy = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/my_answers/");
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    }
    fetchAnswers();
  }, []);

  const GoMyPage = () => {
    navigate("/RespondMyPage");
  };

  const GoAnswer = () => {
    navigate("/Answer");
  };

  const GoLogout = () => {
    navigate("/");
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
        <Menu onClick={GoAnswer}>답변하기</Menu>
        <Menu onClick={GoLogout}>로그아웃</Menu>
        <Menu onClick={GoMyPage} className="design">
          답변 기록
        </Menu>
      </MenuContainer>
      <MainContainer>
        <MainUser />
        <MainTitle>답변을 기록합니다()</MainTitle>
        <MainListBox>
          {answers.map((answer) => (
            <List key={answer.id} answerContent={answer.comment} />
          ))}
        </MainListBox>
      </MainContainer>
      <MoreBtn>답변 더하기</MoreBtn>
    </Container>
  );
};

export default ResMy;
