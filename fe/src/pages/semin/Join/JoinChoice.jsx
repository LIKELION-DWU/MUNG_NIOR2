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

const Choice = styled.div`
  position: relative;
  top: 90px;
  text-align: center;
`;

const QA = styled.div`
  position: relative;
  top: 130px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    cursor: pointer;
  }

  img + img {
    margin-left: 80px;
  }
`;

const JoinChoice = () => {
  const navigate = useNavigate();
  const gotoJoinChoice = () => {
    navigate("/JoinChoice");
  };
  const gotoLoginQ = () => {
    navigate("/LoginQ");
  };
  const gotoJoinQ = () => {
    navigate("/JoinQ");
  };
  const gotoJoinR = () => {
    navigate("/JoinR");
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
      <Choice>
        <span
          style={{
            color: "#000000",
            fontSize: "32px",
            fontWeight: "800",
          }}
        >
          해당 서비스를 통해{" "}
        </span>
        <span
          style={{
            color: "#FF6D2E",
            fontSize: "32px",
            fontWeight: "800",
          }}
        >
          무엇을 하고 싶으신가요?
        </span>
      </Choice>
      <QA>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/q.png`}
          alt="q"
          width="310px"
          onClick={gotoJoinQ}
        />
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/a.png`}
          alt="a"
          width="310px"
          onClick={gotoJoinR}
        />
      </QA>
    </Container>
  );
};

export default JoinChoice;
