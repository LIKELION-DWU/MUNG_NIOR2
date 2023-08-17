import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//css
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Container = styled.div`
  position: relative;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  width: 1280px;
  height: 720px;

  border: 0.5px solid #000;
  background: #fff;
  margin: 0px auto;

  overflow-y: auto;
  overflow-x: hidden;
`;

const Logo = styled.div`
  position: fixed;
  width: 50px;
  margin-top: 60px;
  margin-left: 60px;
  z-index: 999;
`;
//background: rgba(255, 255, 255, 0.78);
const MenuContainer = styled.div`
  position: fixed;
  width: 788px;
  height: 85px;
  padding-top: 40px;

  margin-top: 34px;
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

const Div = styled.div`
  height: 40px;

  margin-top: 160px;

  color: #ff6d2e;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 900;
  line-height: 60px; /* 100% */
`;

const PlateImg = styled.img`
  width: 850px;

  margin-left: 200px;
`;
const TextInput = styled.div`
  width: 330px;
  height: 330px;

  margin-top: -550px;
  margin-left: 460px;

  color: rgba(0, 0, 0, 0.64);
  text-align: center;
  font-family: Tmoney RoundWind;
  font-size: 50px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const SendBtn = styled.img`
  position: fixed;
  width: 300px;

  margin-top: -447px;
  margin-left: 800px;
`;

const P = styled.p`
  display: inline-block;
  margin-left: 340px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
`;

const Div1 = styled.div`
  height: 565px;

  padding-top: 20px;
  padding-left: 190px;
`;

const P2 = styled.p`
  display: inline-block;
  margin-left: 20px;
  margin-top: -500px;

  color: #ff6d2e;
  font-size: 30px;
  font-style: normal;
  font-weight: 900;
`;

const Instruction = styled.div`
  margin-top: 30px;

  color: rgba(0, 0, 0, 0.64);
  text-align: center;
  font-family: Tmoney RoundWind;
  font-size: 60px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const Transcript = styled.p`
  position: absolute;
  overflow: hidden;

  text-align: center;

  margin-top: -625px;
  margin-left: 250px;

  width: 400px;
  height: 400px;

  color: #000;
  text-align: center;
  font-family: Tmoney RoundWind;
  font-size: 60px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

//코드
const Dictaphone = () => {
  //선언
  const navigate = useNavigate();

  const UserNameQ = localStorage.getItem("loggedInUserNameQ");
  const StudentIdQ = localStorage.getItem("loggedInUserIdQ");

  const [userContent, setUserContent] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  //페이지 이동 함수
  const GoWaiting = () => {
    navigate("/Waiting");
  };

  //버튼을 누르면 내용이 저장이 되는 함수
  const onSendButtonClick = async () => {
    console.log(userContent);

    try {
      // 로그인 정보와 사용자 입력을 서버로 전송
      const response = await axios.post("http://127.0.0.1:8000/questions/", {
        // content: userContent,
        content: userContent,
        writer: UserNameQ, // 이 부분은 사용자 이름을 전송하는 부분입니다.
        studentId: StudentIdQ,
      });

      if (response.status === 201) {
        alert("질문 등록에 성공했습니다.");
        GoWaiting();
      } else {
        alert("질문 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("질문 등록 중 오류 발생:", error);
      alert("질문등록 중에 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/signup/student/"
        );
        setLoggedInUser(response.data);
      } catch (error) {
        console.error("첫번째 오류 발생:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // loggedInUser가 업데이트되면 로그를 출력
  useEffect(() => {
    console.log("로그인된 사용자 정보:", loggedInUser);
  }, [loggedInUser]);

  const onEndSpeechRecognition = (finalTranscript) => {
    setUserContent(finalTranscript);
    setLoggedInUser((prevUser) => ({ ...prevUser, content: finalTranscript }));
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ onEnd: onEndSpeechRecognition });

  useEffect(() => {
    if (transcript !== "") {
      onEndSpeechRecognition(transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Div1>
      <P>음성인식: </P>
      <P2>{listening ? "시작" : "멈춤"}</P2>
      <div style={{ marginTop: "-100px" }}>
        <img
          src={`${process.env.PUBLIC_URL}/images_minwoo/plate.png`}
          width="900"
        />
      </div>{" "}
      {UserNameQ && (
        <Transcript
          onClick={() => {
            SpeechRecognition.startListening();
            setUserContent(transcript);
          }}
          empty={transcript === "" ? "true" : "false"}
        >
          {transcript}
          {transcript === "" && (
            <Instruction>
              접시를 누르면
              <br />
              음성인식을
              <br /> 시작합니다
            </Instruction>
          )}
        </Transcript>
      )}
      {!listening && (
        <SendBtn
          onClick={() => onSendButtonClick(loggedInUser)}
          src={`${process.env.PUBLIC_URL}/images_minwoo/sendBtn.png`}
        ></SendBtn>
      )}
    </Div1>
  );
};

const Question = () => {
  const navigate = useNavigate();

  const GoAnswer = () => {
    navigate("/LookAnswer");
  };
  const GoLogout = () => {
    navigate("/");
  };
  const GoMyPage = () => {
    navigate("/QuestionMyPage");
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
        <Menu className="question">질문하기</Menu>
        <Menu onClick={GoLogout}>로그아웃</Menu>
        <Menu onClick={GoMyPage}>질문 기록</Menu>
      </MenuContainer>

      <Div>
        <strong>당신의 질문을 담아주세요</strong>
      </Div>

      <Dictaphone />
    </Container>
  );
};

export default Question;
