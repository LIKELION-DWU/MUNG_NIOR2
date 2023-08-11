import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;

  width: 1280px;
  height: 720px;

  border: 0.5px solid #000;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.87) 0%,
    #ff4d00 100%
  );
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

const Complete = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;

  top: 130px;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 60px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;

  img {
    margin-bottom: 30px;
  }
`;

const JoinComplete = () => {
  const navigate = useNavigate();
  const gotoJoinChoice = () => {
    navigate("/JoinChoice");
  };
  const gotoLoginQ = () => {
    navigate("/LoginQ");
  };

  // 일정 시간 후에 페이지 이동 함수 호출
  useEffect(() => {
    const timeout = setTimeout(() => {
      gotoLoginQ();
    }, 3000);

    return () => {
      clearTimeout(timeout); // 컴포넌트 언마운트 시 타임아웃 클리어
    };
  }, []);

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
        <Menu>로그인</Menu>
        <Menu className="join" onClick={gotoJoinChoice}>
          회원가입
        </Menu>
      </MenuContainer>
      <Complete>
        <img
          src={`${process.env.PUBLIC_URL}/images_semin/complete.png`}
          alt="complete"
          width="200px"
        />
        회원가입 완료
        <br />
        <span
          style={{
            color: "#fff",
            fontSize: "30px",
            fontWeight: "900",
            fontFamily: "Pretendard",
            fontStyle: "normal",
            marginTop: "20px",
          }}
        >
          3초 후에 로그인 창으로 넘어갑니다.
        </span>
      </Complete>
    </Container>
  );
};

export default JoinComplete;
