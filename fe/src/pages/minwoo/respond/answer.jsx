import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

// 내용
const ListContainer = styled.div`
  background: #00ff22;

  margin-top: 30px;
  padding: 20px;
`;

const WhiteBox = styled.div`
  width: 1130px;
  height: ${(props) => (props.expanded ? "343px" : "210px")};

  margin-left: 50px;
  margin-top: 38px;

  padding-top: 35px;

  border-radius: 30px;
  background: #fff;
  box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.54);
`;
const QuestBox = styled.div`
  height: 50px;

  padding-left: 52px;

  color: #000;
  font-family: Pretendard;
  font-size: 33px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const AnswerBox = styled.div`
  background: #ff0000;
  position: relative;

  width: 995px;
  height: ${(props) => (props.expanded ? "190px" : "53px")};

  margin-top: 13px;
  margin-left: 50px;

  padding-left: 30px;
  padding-top: 20px;

  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset;
`;
const InputAnswer = styled.input`
  width: 950px;
  height: ${(props) => (props.expanded ? "120px" : "40px")};
  border: none;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const NextBtn = styled.button`
  height: 60px;
  width: 90px;

  margin-left: 998px;
  margin-top: 0px;

  background-color: transparent;
  border: none;
`;

const fetchQuestions = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/questions/");
    return response.data; // 실제 데이터 배열 반환
  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // 에러 시 빈 배열 반환
  }
};

const List = ({ questionContent, questionId }) => {
  const navigate = useNavigate();
  const [answerContent, setAnswerContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const UserNameR = localStorage.getItem("loggedInUserNameR");

  const GoMyPage = () => {
    navigate("/RespondMyPage");
  };

  const handleInputClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAnswerChange = (event) => {
    setAnswerContent(event.target.value); // 사용자가 입력할 때 답변 내용 업데이트
  };

  const handleNextClick = async () => {
    try {
      // API 엔드포인트에 POST 요청 보내기
      console.log(answerContent);
      const response = await axios.post(
        `http://127.0.0.1:8000/questions/${questionId}/answers/`,
        {
          comment: answerContent,
          photo: null,
          writer: UserNameR,
        }
      );

      // POST 성공 후 수행할 작업이 있다면 여기에 추가
      if ((response.status = 200)) alert("답변이 성공적으로 전송되었습니다!");
    } catch (error) {
      alert("답변 전송 중 에러:", error);
    }

    // 답변 전송 후 필요한 로직 추가
  };

  return (
    <WhiteBox expanded={isExpanded}>
      <QuestBox>Q. {questionContent}</QuestBox>
      <AnswerBox expanded={isExpanded}>
        <InputAnswer
          onClick={handleInputClick}
          onChange={handleAnswerChange}
          value={answerContent}
          expanded={isExpanded}
        ></InputAnswer>
        <img
          src="./images_minwoo/addImg.png"
          style={{
            width: "70px",
            position: "absolute",
            bottom: "6px",
            right: "10px",
          }}
        />
      </AnswerBox>
      <NextBtn onClick={handleNextClick}>
        <img src="./images_minwoo/next.png" style={{ width: "180px" }} />
      </NextBtn>
    </WhiteBox>
  );
};

//페이지 함수
const Answer = () => {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    // 페이지 로딩 시 API 호출하여 데이터 가져오기
    async function fetchData() {
      const data = await fetchQuestions();
      setQuestionData(data);
    }
    fetchData();
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
          style={{ width: "150px" }}
        />
      </Logo>

      <MenuContainer>
        <Menu onClick={GoAnswer} className="design">
          답변하기
        </Menu>
        <Menu onClick={GoLogout}>로그아웃</Menu>
        <Menu onClick={GoMyPage}>답변 기록</Menu>
      </MenuContainer>

      <ListContainer>
        {questionData.map((question) => (
          <List
            key={question.id}
            questionId={question.id}
            questionContent={question.content}
          />
        ))}
      </ListContainer>
    </Container>
  );
};

export default Answer;
