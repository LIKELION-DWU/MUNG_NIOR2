import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Styled from "styled-components";
//semin_메인
import PreMain from "./pages/semin/Main/PreMain";
import MainQ from "./pages/semin/Main/MainQ";
import MainR from "./pages/semin/Main/MainR";
//semin_회원가입
import JoinChoice from "./pages/semin/Join/JoinChoice";
import JoinQ from "./pages/semin/Join/JoinQ";
import JoinR from "./pages/semin/Join/JoinR";
import JoinComplete from "./pages/semin/Join/JoinComplete";
//semin_로그인
import LoginQ from "./pages/semin/Login/LoginQ";
import LoginR from "./pages/semin/Login/LoginR";
//minwoo_답변자
import Answer from "./pages/minwoo/respond/answer";
import RespondMyPage from "./pages/minwoo/respond/myPage";
import Record from "./pages/minwoo/respond/record";
//minwoo_작성자
import QuestionMyPage from "./pages/minwoo/question/myPage";
import LookAnswer from "./pages/minwoo/question/lookAnswer";
import Question from "./pages/minwoo/question/question";
import Waiting from "./pages/minwoo/question/waiting";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Styled />
        <Routes>
          {/* 세민 경로_메인, 로그인 이후 메인 페이지 */}
          <Route path="/" element={<PreMain />} />
          <Route path="/MainQ" element={<MainQ />} />
          <Route path="/MainR" element={<MainR />} />
          {/* 세민 경로_회원가입 */}
          <Route path="/JoinChoice" element={<JoinChoice />} />
          <Route path="/JoinQ" element={<JoinQ />} />
          <Route path="/JoinComplete" element={<JoinComplete />} />
          <Route path="/JoinR" element={<JoinR />} />
          {/* 세민 경로_로그인 */}
          <Route path="/LoginQ" element={<LoginQ />} />
          <Route path="/LoginR" element={<LoginR />} />
          {/* 민우 경로_답변자 */}
          <Route path="/Answer" element={<Answer />} />
          <Route path="/RespondMyPage" element={<RespondMyPage />} />
          <Route path="/Record" element={<Record />} />
          {/* 민우경로_작성자 */}
          <Route path="/QuestionMyPage" element={<QuestionMyPage />} />
          <Route path="/LookAnswer" element={<LookAnswer />} />
          <Route path="/Question" element={<Question />} />
          <Route path="/Waiting" element={<Waiting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
