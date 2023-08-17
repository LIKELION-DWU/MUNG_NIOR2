import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  position: relative;

  width: 1280px;
  height: 720px;

  border: 0.5px solid #000;
  background: #fff;
  margin: 0px auto;

  overflow-y: hidden;
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
  position: relative;
  margin-top: -40px;
  margin-left: 310px;

  line-height: 1;
`;

const Menu = styled.div`
  position: relative;
  display: inline-block;

  margin-left: 120px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;

  &.join {
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

const Name = styled.div`
  position: relative;
  top: 80px;
  text-align: center;
`;

const NameInput = styled.input`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  top: 110px;

  width: 670px;
  height: 110px;

  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  border: none;
  color: #000;
  font-family: Pretendard;
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const Phone = styled.div`
  position: relative;
  top: 140px;
  text-align: center;
`;

const PhoneInput = styled.input`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  top: 170px;

  width: 670px;
  height: 110px;

  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);

  border: none;
  color: #000;
  font-family: Pretendard;
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;

  &:focus {
    outline: none;
  }
`;

const Nextbtn = styled.div`
  position: relative;
  top: 137px;
  left: 1120px;
  cursor: pointer;
`;

const JoinQ = () => {
  const navigate = useNavigate();
  const gotoJoinChoice = () => {
    navigate("/JoinChoice");
  };
  const gotoLoginQ = () => {
    navigate("/LoginQ");
  };
  const gotoJoinComplete = () => {
    navigate("/JoinComplete");
  };

  const handleNextBtnClick = async () => {
    if (nameQ.trim() === "" || phoneQ.trim() === "") {
      alert("필수 정보를 모두 입력해주세요.");
    } else {
      try {
        // 회원가입 정보를 서버로 전송
        const response = await axios.post(
          "http://127.0.0.1:8000/signup/student/",
          {
            username: nameQ,
            phoneNumber: phoneQ,
          }
        );
        if (response.status === 201) {
          // 응답 데이터를 변수에 저장
          const reponseId = await axios.get(
            "http://127.0.0.1:8000/signup/student/"
          );
          const length = reponseId.data.length;
          const id = reponseId.data[length - 1].studentId;

          localStorage.setItem("loggedInUserIdQ", id);

          alert("회원가입이 완료되었습니다.");

          gotoJoinComplete();
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("회원가입 요청 중 오류 발생:", error);
        alert("회원가입에 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const [nameQ, setNameQ] = useState("");
  const handleNameQ = (event) => {
    setNameQ(event.target.value);
  };
  const [phoneQ, setPhoneQ] = useState("");
  const handlePhoneQ = (event) => {
    setPhoneQ(event.target.value);
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
        <Menu>질문</Menu>
        <Menu>답변</Menu>
        <Menu onClick={gotoLoginQ}>로그인</Menu>
        <Menu className="join" onClick={gotoJoinChoice}>
          회원가입
        </Menu>
      </MenuContainer>
      <Name>
        <span
          style={{
            color: "#000000",
            fontSize: "50px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          1. 당신의{" "}
        </span>
        <span
          style={{
            color: "#FF6D2E",
            fontSize: "50px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          이름은{" "}
        </span>
        <span
          style={{
            color: "#000000",
            fontSize: "50px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          무엇인가요?
        </span>
      </Name>
      <NameInput type="text" value={nameQ} onChange={handleNameQ}></NameInput>
      <Phone>
        <span
          style={{
            color: "#000000",
            fontSize: "50px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          2. 당신의{" "}
        </span>
        <span
          style={{
            color: "#FF6D2E",
            fontSize: "50px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          전화번호는{" "}
        </span>
        <span
          style={{
            color: "#000000",
            fontSize: "50px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          무엇인가요?
        </span>
      </Phone>
      <PhoneInput
        type="text"
        value={phoneQ}
        onChange={handlePhoneQ}
        placeholder="010-0000-0000"
      ></PhoneInput>
      <Nextbtn>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/nextbtn.png`}
          alt="nextbtn"
          width="160px"
          onClick={handleNextBtnClick}
        />
      </Nextbtn>
    </Container>
  );
};

export default JoinQ;
