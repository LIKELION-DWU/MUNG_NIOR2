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

  :hover {
    cursor: pointer;
  }
`;
const MenuContainer = styled.div`
  position: relative;
  margin-top: -41px;
  margin-left: 461px;

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

  margin-top: 37px;
  padding-top: 20px;

  border-radius: 0px 150px 0px 0px;

  background: linear-gradient(
    180deg,
    rgba(255, 109, 46, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const MainUser = () => {
  const loggedInUserNameR = localStorage.getItem("loggedInUserNameR");
  const RespondLength = JSON.parse(localStorage.getItem("RespondLength")) || 0;

  const progressBarIncrement = 2;

  const percentage = Math.min(RespondLength * progressBarIncrement, 100);

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

const List = ({ comment }) => {
  const navigate = useNavigate();

  const GoRecord = (commentId) => {
    navigate(
      `/Record?comment=${encodeURIComponent(
        commentId
      )}&img=${encodeURIComponent(comment.img)}`
    );
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
    height: 70px;
    white-space: no-wrap; /* 한 줄로 글이 표시되도록 설정 */
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
      <ListContent>{comment.comment}</ListContent>
      {/*<ListBtn
        //onClick={() => GoRecord(comment.id)}
        src={`${process.env.PUBLIC_URL}/images_minwoo/next.png`}
      />*/}
    </ListWhite>
  );
};

//버튼
const MoreBtn = styled.button`
  width: 180px;
  height: 55px;

  margin-left: 750px;
  margin-top: -30px;

  border: none;
  border-radius: 20px;
  background: #ff6d2e;

  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const ResMy = () => {
  const navigate = useNavigate();
  const [respondData, setRespondData] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem("TokenR");
        console.log(authToken);

        const response = await axios.get("http://127.0.0.1:8000/my_answers/", {
          headers: {
            Authorization: `Token ${authToken}`, // 사용자 토큰을 헤더에 추가
          },
        });

        console.log(response);

        const RespondLength = response.data.answers.length;
        localStorage.setItem("RespondLength", RespondLength);

        const respondData = response.data.answers; // "answers" 필드를 직접 가져옴
        setRespondData(respondData);
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
    navigate("/RespondMyPage");
  };
  const GoAnswer = () => {
    navigate("/Answer");
  };
  const GoMainR = () => {
    navigate("/MainR");
  };

  const RespondLength = localStorage.getItem("RespondLength");

  return (
    <Container>
      <Logo onClick={GoMainR}>
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
        <MainTitle>답변을 기록합니다 ({RespondLength})</MainTitle>
        <MainListBox>
          {respondData.length > 0 ? (
            respondData.map((comment) => (
              <List key={comment.id} comment={comment} />
            ))
          ) : (
            <p>No responds available.</p>
          )}
        </MainListBox>
      </MainContainer>
      <MoreBtn onClick={GoAnswer}>답변 더하기</MoreBtn>
    </Container>
  );
};

export default ResMy;
