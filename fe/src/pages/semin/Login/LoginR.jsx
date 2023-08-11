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

  &.login {
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

const Choice = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50px;

  :hover {
    cursor: pointer;
  }

  img + img {
    margin-left: 50px;
  }
`;

const InputQ = styled.div`
  position: relative;
  top: 85px;
  text-align: center;
  margin-bottom: -20px;
`;

const Input = styled.input`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 30px;

  top: 100px;

  width: 500px;
  height: 75px;

  border-radius: 13.536px;
  background: #fff;
  box-shadow: 0px 0px 9.360363960266113px 0px rgba(0, 0, 0, 0.25);

  border: none;
  color: #000;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const NameInput = Input;
const PhoneInput = Input;

const KakaoLogin = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 110px;
  cursor: pointer;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Loginbtn = styled.div`
  position: relative;
  cursor: pointer;

  top: -55px;
  left: 980px;
`;

const LoginR = () => {
  const navigate = useNavigate();
  const gotoJoinChoice = () => {
    navigate("/JoinChoice");
  };
  const gotoMainR = () => {
    navigate("/MainR");
  };
  const gotoLoginQ = () => {
    navigate("/LoginQ");
  };

  const handleLoginBtnClick = async () => {
    if (nameR.trim() === "" || phoneR.trim() === "") {
      alert("필수 정보를 모두 입력해주세요.");
    } else {
      try {
        // 로그인 정보를 서버로 전송
        const response = await axios.post(
          "http://127.0.0.1:8000/login/teacher/",
          {
            username: nameR,
            phoneNumber: phoneR,
          }
        );

        if (response.status === 200) {
          alert("로그인에 성공했습니다.");
          gotoMainR();
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("인증되지 않았거나 선생님이 아닙니다.");
        } else {
          console.error("로그인 요청 중 오류 발생:", error);
          alert("로그인에 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    }
  };

  const [nameR, setNameR] = useState("");
  const handleNameR = (event) => {
    setNameR(event.target.value);
  };
  const [phoneR, setPhoneR] = useState("");
  const handlePhoneR = (event) => {
    setPhoneR(event.target.value);
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
        <Menu className="login">로그인</Menu>
        <Menu onClick={gotoJoinChoice}>회원가입</Menu>
      </MenuContainer>
      <Choice>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/qwhite.png`}
          alt="qorange"
          width="230px"
          onClick={gotoLoginQ}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/rorange.png`}
          alt="rwhite"
          width="230px"
        />
      </Choice>
      <InputQ>
        <span
          style={{
            color: "#FF6D2E",
            fontSize: "35px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          이름
        </span>
        <span
          style={{
            color: "#000000",
            fontSize: "35px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          과{" "}
        </span>
        <span
          style={{
            color: "#FF6D2E",
            fontSize: "35px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          전화번호
        </span>
        <span
          style={{
            color: "#000000",
            fontSize: "35px",
            fontWeight: "990",
            fontFamily: "Pretendard",
            fontStyle: "normal",
          }}
        >
          를 입력해주세요.
        </span>
      </InputQ>
      <NameInput
        type="text"
        value={nameR}
        onChange={handleNameR}
        placeholder={"이름"}
      ></NameInput>
      <PhoneInput
        type="text"
        value={phoneR}
        onChange={handlePhoneR}
        placeholder={"전화번호"}
      ></PhoneInput>
      <KakaoLogin>
        or
        <br />
        <br />
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/kakaologin.png`}
          alt="kakaologin"
          width="300px"
        />
      </KakaoLogin>
      <Loginbtn>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/loginbtn.png`}
          alt="loginbtn"
          width="300px"
          onClick={handleLoginBtnClick}
        />
      </Loginbtn>
    </Container>
  );
};

export default LoginR;
