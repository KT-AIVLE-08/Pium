/** @jsxImportSource @emotion/react */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  loginMainImgStyle,
  loginMainSectionWrapperStyle,
  loginMainWrapperStyle,
} from "./style";
import { UserInput, UserBtn } from "common/index";
import { userInputGuideMsgStyle } from "common/UserInput";

import { userState } from "store/userState";

import { AUTHOR, LINK } from "utils/constants";

export const LoginPage = () => {
  const nav = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  const idRef = useRef();
  const passwordRef = useRef();

  // 로그인 상태에서 url 입력으로 /login 라우팅 요청 시, /study 로 이동
  useEffect(() => {
    if (user.author === AUTHOR.STUDENT) nav(LINK.STUDY);
    if (user.author === AUTHOR.TEACHER) nav(`${LINK.MANAGE}${LINK.SCENARIO}${LINK.USER}/${user.user_id}`)
  });

  const handleClickLoginBtn = (link) => {
    if (link === LINK.CONSENT) nav(LINK.CONSENT);
    if (link === LINK.LOGIN) {
      let success = true
      // 아이디 확인
      if (id === "") {
        idRef.current.innerHTML = "아이디를 입력해주세요.";
        idRef.current.style.display = "flex";
        success = false
      } else idRef.current.style.display = "none";

      // 비밀번호 확인
      if (password === "") {
        passwordRef.current.innerHTML = "비밀번호를 입력해주세요.";
        passwordRef.current.style.display = "flex";
        success = false
      } else passwordRef.current.style.display = "none";

      // 로그인 api 요청
      if (success) {
        fetch("https://pium.site/api/login/", {
          credentials: "include",
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login_id: id,
            pw: password,
          })
        }).then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            // 응답 에러 처리
            throw new Error("아이디 혹은 비밀번호가 일치하지 않습니다.");
          }
        }).then((data) => {
          const token = data.token;

          // user 전역 상태값 입력
          setUser({
            author: data.type === "teacher" ? AUTHOR.TEACHER : AUTHOR.STUDENT,
            user_id: data.user_id,
            school_id: data.school_id,
          })

          // localStorage 에 토큰 저장
          window.localStorage.setItem("token", token)

          if (data.type === "student") {
            nav(LINK.STUDY);
          } else if (data.type === "teacher") {
            nav(LINK.MANAGE);
          }
        }).catch((err) => {
          alert(err.message);
        })
      }
    }
  };

  return (
    <>
      <main css={loginMainWrapperStyle}>
        <img
          src={process.env.PUBLIC_URL + "/Leaf01.png"}
          alt="잎 이미지 01"
          css={loginMainImgStyle}
          style={{ top: "18%", left: "24%" }}
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/Leaf02.png"}
          alt="잎 이미지 02"
          css={loginMainImgStyle}
          style={{ top: "73%", left: "66%" }}
        ></img>
        <div style={{ width: "42rem", margin: "0 auto" }}>
          <section css={loginMainSectionWrapperStyle}>
            <UserInput
              type="text"
              placeholder="아이디를 입력하세요."
              margin="4.375rem"
              input={id}
              setInput={setId}
            />
            <span css={userInputGuideMsgStyle} ref={idRef}></span>
            <UserInput
              type="password"
              placeholder="비밀번호를 입력하세요."
              margin="4.375rem"
              input={password}
              setInput={setPassword}
            />
            <span css={userInputGuideMsgStyle} ref={passwordRef}></span>
            <div style={{ height: "5rem" }}></div>
            <UserBtn
              text="로그인"
              color={true}
              link={LINK.LOGIN}
              onClick={handleClickLoginBtn}
            />
            <UserBtn
              text="회원가입"
              color={false}
              link={LINK.CONSENT}
              onClick={handleClickLoginBtn}
            />
          </section>
        </div>
      </main>
    </>
  );
};
