import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  //   background-color: #f5f0e4;
  -ms-overflow-style: none;
  font-family: "Inter", sans-serif;
  overflow: hidden;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 60px;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 10px;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Back = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Logo = styled.div`
  cursor: pointer;
`;

const Video = styled.div`
  cursor: pointer;
  width: 30px;
`;

const Body = styled.div`
  height: 752px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`;

const Profile = styled.div``;
const ProfileContent = styled.div`
  height: 142px;
  position: relative;
  box-shadow: 0px 4px 15px -2px rgba(0, 0, 0, 0.25);
`;
const ProFileImg = styled.img`
  float: left;
  margin-top: 26px;
  margin-left: 30px;
`;
const ProFileName = styled.span`
  text-align: center;
  font-family: S-Core Dream;
  font-size: 20px;
  position: absolute;
  top: 64px;
  left: 37%;
`;
const Logout = styled.div`
  color: #60716f;
  text-align: center;
  font-family: S-Core Dream;
  font-size: 10px;
  font-weight: 500;
  text-decoration-line: underline;
  position: absolute;
  top: 43px;
  right: 20px;
`;

const MemberInfo = styled.div`
  height: 203px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MemHeader = styled.div`
  height: 70px;
  position: relative;
`;
const MemHeaderContent = styled.div`
  font-family: S-Core Dream;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 37px;
  left: 29px;
`;
const Edit = styled.div`
  position: absolute;
  top: 47px;
  right: 15px;
  color: #05bba2;
  font-family: S-Core Dream;
  font-size: 10px;
  font-weight: 300;
  text-decoration-line: underline;
`;
const Gra = styled.div`
  position: relative;
  background: linear-gradient(to right, #e02d11, #05bba2);
  width: 100%;
  height: 2px;
  border: none; /* 선 없애기 */
`;
const MemContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 220px;
  margin-top: 18px;
  margin-left: 29px;
`;
const Name = styled.div`
  color: #60716f;
  font-family: S-Core Dream;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 91px;
  text-align: left;
  padding-bottom: 18px;
`;
const Uname = styled.div`
  font-family: S-Core Dream;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
  display: inline;
`;
const Id = styled.div`
  color: #60716f;
  font-family: S-Core Dream;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 91px;
  text-align: left;
  padding-bottom: 18px;
`;
const Uid = styled.div`
  font-family: S-Core Dream;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
`;
const Phone = styled.div`
  color: #60716f;
  font-family: S-Core Dream;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 91px;
  text-align: left;
`;
const Uphone = styled.div`
  font-family: S-Core Dream;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 125px;
  text-align: left;
`;

const Card = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const CardHeader = styled.div`
  height: 70px;
  position: relative;
  margin-bottom: 1px;
`;

const CardHeaderContent = styled.div`
  font-family: "S-Core Dream";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 37px;
  left: 29px;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87px;
  margin-left: 33px;
  margin-left: 33px;
  margin-top: 14px;
  padding-bottom: 14px;
`;

const CardImg = styled.div``;

const CardinfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 16px;
`;
const NumWrapper = styled.div`
  text-align: left;
  width: 220px;
  margin-right: auto;
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  line-height: normal;
`;
const PwWrapper = styled.div`
  text-align: left;
  width: 220px;
  margin-right: auto;
`;
const CVCWrapper = styled.div`
  text-align: left;
  width: 70px;
  margin-right: auto;
  display: inline-block;
`;
const DateWrapper = styled.div`
  text-align: left;
  width: 110px;
  margin-right: auto;
  display: inline-block;
`;
const CardBalanceWrapper = styled.div`
  text-align: left;
  width: 110px;
  margin-right: auto;
  display: inline-block;
`;
const Num = styled.span`
  font-weight: 500;
  width: 49px;
  text-align: left;
  display: inline-block;
`;
const Unum = styled.span`
  font-weight: 300;
`;
const Pw = styled.span`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 49px;
  text-align: left;
  display: inline-block;
`;
const Upw = styled.span`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const CVC = styled.span`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 49px;
  text-align: left;
  display: inline-block;
`;
const Ucvc = styled.span`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const Date = styled.span`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 78px;
  text-align: left;
  display: inline-block;
`;
const Udate = styled.span`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const Balance = styled.span`
  color: #60716f;
  text-align: center;
  font-family: S-Core Dream;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const UbalanceWrapper = styled.div`
  display: inline-block;
  color: #000;
  font-family: S-Core Dream;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;
const Ubalance = styled.span``;
const Won = styled.span``;
const Charge = styled.div`
  color: #e22d11;
  text-align: center;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  width: 85px;
  text-align: left;
  padding-top: 5px;
`;

const PayHistory = styled.div`
  height: auto;
`;
const PayHeader = styled.div`
  height: 70px;
  position: relative;
  margin-bottom: 1px;
`;
const PayHeaderContent = styled.div`
  font-family: S-Core Dream;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  top: 37px;
  left: 29px;
`;
const PayContent = styled.div`
  height: auto;
`;
const WhiteBox = styled.div`
  height: 78px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 10px;
`;
const PayWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  padding-top: 2px;
`;
const PayImg = styled.div``;
const PayinfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 9px;
  width: 70%;
  margin-bottom: 9px;
`;
const ProductName = styled.div`
  color: #000;
  font-family: S-Core Dream;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 80px;
`;
const QuantityWrapper = styled.div`
  color: #000;
  font-family: S-Core Dream;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-top: 4px;
  margin-right: auto;
`;
const Whole = styled.span``;
const Quantity = styled.span``;
const Count = styled.span``;
const Detail = styled.div`
  width: 123px;
  text-align: right;
  color: #e22d11;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  position: absolute;
  top: 10px;
  right: 9px;
`;
const PriceWrapper = styled.div`
  color: #000;
  font-family: S-Core Dream;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 300px;
  margin-right: auto;
  text-align: left;
  margin-left: 13px;
  margin-top: 8px;
`;
const Price = styled.span``;
const TypeWrapper = styled.div`
  color: #000;
  font-family: S-Core Dream;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: auto;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const WhatType = styled.span``;
const Type = styled.span``;
const CoachMark = styled.div`
  position: fixed;
  bottom: 80px;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
`;

const BottomBar = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  position: fixed;
  bottom: 0;
  width: 100%;
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
`;

const Menu = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Search = styled.div`
  width: 30px;
  cursor: pointer;
`;

const Home = styled.div`
  width: 30px;
  cursor: pointer;
`;

const My = styled.div`
  width: 30px;
  cursor: pointer;
`;

const MypageMain = () => {
  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/VerifyLogin");
  };

  const navigateToCharge = () => {
    navigate("/Charge");
  };

  const navigateToHistory = () => {
    navigate("/PayHistory"); //해당 박스의 결제내역으로 이동하도록 수정해야함
  };

  const navigateToBack = () => {
    window.history.back();
  };
  const navigateToFirstpage = () => {
    navigate("/");
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back onClick={navigateToBack}>
            <img
              src={`${process.env.PUBLIC_URL}/images/left.png`}
              alt="back"
              width="12px"
            />
          </Back>
          <Logo>
            <img
              src={`${process.env.PUBLIC_URL}/images/로고3.png`}
              alt="logo"
              width="90px"
            />
          </Logo>
          <Video>
            <img
              src={`${process.env.PUBLIC_URL}/images/carousel-video.png`}
              width="30px"
              alt="video"
            />
          </Video>
        </Topbar>

        <Body>
          <Profile>
            <ProfileContent>
              <ProFileImg
                src={`${process.env.PUBLIC_URL}/images/profile.png`}
                width="100px"
                height="100px"
              ></ProFileImg>
              <ProFileName>000 님</ProFileName>
              <Logout onClick={navigateToFirstpage}>로그아웃</Logout>
            </ProfileContent>
          </Profile>

          <MemberInfo>
            <MemHeader>
              <MemHeaderContent>회원정보</MemHeaderContent>
              <Edit onClick={navigateToVerify}>비밀번호 수정</Edit>
            </MemHeader>
            <Gra></Gra>
            <MemContent>
              <Name>고객명</Name>
              <Uname>000</Uname>
              <Id>아이디</Id>
              <Uid>00000@naver.com</Uid>
              <Phone>연락처</Phone>
              <Uphone>010-0000-0000</Uphone>
            </MemContent>
          </MemberInfo>

          <Card>
            <CardHeader>
              <CardHeaderContent>
                <Uname>ㅇㅇㅇ</Uname>님의 카드
              </CardHeaderContent>
            </CardHeader>
            <Gra></Gra>
            <CardWrapper>
              <CardImg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/card.png`}
                  width="110px"
                  height="65px"
                />
              </CardImg>
              <CardinfoWrapper>
                <NumWrapper>
                  <Num>카드번호</Num>
                  <Unum>0000 0000 0000 0000</Unum>
                </NumWrapper>
                <PwWrapper>
                  <Pw>비밀번호</Pw>
                  <Upw>0000</Upw>
                </PwWrapper>
                <CVCWrapper>
                  <CVC>CVC</CVC>
                  <Ucvc>000</Ucvc>
                </CVCWrapper>
                <DateWrapper>
                  <Date>유효기간 년/월</Date>
                  <Udate>25/08</Udate>
                </DateWrapper>
                <CardBalanceWrapper>
                  <Balance>카드 잔액</Balance>
                  <UbalanceWrapper>
                    <Ubalance>00,000</Ubalance>
                    <Won>원</Won>
                  </UbalanceWrapper>
                </CardBalanceWrapper>
                <Charge onClick={navigateToCharge}>충전하기</Charge>
              </CardinfoWrapper>
            </CardWrapper>
          </Card>

          <PayHistory>
            <PayHeader>
              <PayHeaderContent>결제 내역</PayHeaderContent>
            </PayHeader>
            <Gra></Gra>
            <PayContent>
              <WhiteBox>
                <PayWrapper>
                  <PayImg>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/productSample.png`}
                      width="70px"
                      height="70px"
                    ></img>
                  </PayImg>
                  <PayinfoWrapper>
                    <ProductName>상품명</ProductName>
                    <QuantityWrapper>
                      <Whole>총 </Whole>
                      <Quantity>N</Quantity>
                      <Count> 개</Count>
                    </QuantityWrapper>
                    <Detail onClick={navigateToHistory}>더보기</Detail>
                    <PriceWrapper>
                      <Price>00,000</Price>
                      <Won> 원</Won>
                    </PriceWrapper>
                    <TypeWrapper>
                      <WhatType>결제 유형-</WhatType>
                      <Type>일반 카드 결제</Type>
                    </TypeWrapper>
                  </PayinfoWrapper>
                </PayWrapper>
              </WhiteBox>
              <WhiteBox>
                <PayWrapper>
                  <PayImg>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/productSample.png`}
                      width="70px"
                      height="70px"
                    ></img>
                  </PayImg>
                  <PayinfoWrapper>
                    <ProductName>상품명</ProductName>
                    <QuantityWrapper>
                      <Whole>총 </Whole>
                      <Quantity>N</Quantity>
                      <Count> 개</Count>
                    </QuantityWrapper>
                    <Detail onClick={navigateToHistory}>더보기</Detail>
                    <PriceWrapper>
                      <Price>00,000</Price>
                      <Won> 원</Won>
                    </PriceWrapper>
                    <TypeWrapper>
                      <WhatType>결제 유형-</WhatType>
                      <Type>일반 카드 결제</Type>
                    </TypeWrapper>
                  </PayinfoWrapper>
                </PayWrapper>
              </WhiteBox>
              <WhiteBox>
                <PayWrapper>
                  <PayImg>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/productSample.png`}
                      width="70px"
                      height="70px"
                    ></img>
                  </PayImg>
                  <PayinfoWrapper>
                    <ProductName>상품명</ProductName>
                    <QuantityWrapper>
                      <Whole>총 </Whole>
                      <Quantity>N</Quantity>
                      <Count> 개</Count>
                    </QuantityWrapper>
                    <Detail onClick={navigateToHistory}>더보기</Detail>
                    <PriceWrapper>
                      <Price>00,000</Price>
                      <Won> 원</Won>
                    </PriceWrapper>
                    <TypeWrapper>
                      <WhatType>결제 유형-</WhatType>
                      <Type>일반 카드 결제</Type>
                    </TypeWrapper>
                  </PayinfoWrapper>
                </PayWrapper>
              </WhiteBox>
            </PayContent>
          </PayHistory>
          <CoachMark>
            <img
              src={`${process.env.PUBLIC_URL}/images/coachmark.png`}
              width="48px"
            />
          </CoachMark>
        </Body>
        <BottomBar>
          <Menu>
            <img
              src={`${process.env.PUBLIC_URL}/images/menu.png`}
              width="26px"
            />
          </Menu>
          <Search>
            <img
              src={`${process.env.PUBLIC_URL}/images/search.png`}
              width="26px"
            />
          </Search>
          <Home>
            <img
              src={`${process.env.PUBLIC_URL}/images/home.png`}
              width="26px"
            />
          </Home>
          <My>
            <img src={`${process.env.PUBLIC_URL}/images/me.png`} width="26px" />
          </My>
        </BottomBar>
      </BodyWrapper>
    </Container>
  );
};

export default MypageMain;
