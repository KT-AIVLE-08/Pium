/** @jsxImportSource @emotion/react */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";

import { UserInput, UserBtn } from "common";
import { signupMainImgStyle, signupMainSectionWrapperStyle } from "./style";
import { AUTHOR, LINK } from "utils/constants";
import {
  idEngNum,
  idLength,
  isMatchPassword,
  isPhone,
  phoneLength,
  schoolKo,
  schoolLength,
  strongPassword,
  usernameKo,
  usernameLength,
} from "utils/userValidate";
import { userInputGuideMsgStyle } from "common/UserInput";
import { consentState, userState } from "store/userState";

export const SignupPage = () => {
  const margin = "2.75rem";

  const user = useRecoilValue(userState);
  const [consent, setConsent] = useRecoilState(consentState);

  const nav = useNavigate();

  // 각 input 의 value
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");

  // 각 input value 에 따른 안내 메시지(span)
  const usernameRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const phoneRef = useRef();
  const schoolRef = useRef();

  // 로그인 상태에서 url 입력으로 /signup 라우팅 요청 시, /study 로 이동
  useEffect(() => {
    if (user.author !== AUTHOR.ANONYMOUS) nav(LINK.STUDY);
    if (consent.personal === false || consent.policy === false) nav(LINK.CONSENT);
  });

  const handleClickSignupBtn = () => {
    let success = true
    // 이름 길이 제한
    if (!usernameLength(username)) {
      usernameRef.current.innerHTML = "1글자 이상 4글자 이하로 입력해주세요.";
      usernameRef.current.style.display = "flex";
      success = false
    }
    // 이름 한글만
    else if (!usernameKo(username)) {
      usernameRef.current.innerHTML = "한글을 입력해주세요.";
      usernameRef.current.style.display = "flex";
      success = false
    } else usernameRef.current.style.display = "none";

    // 아이디 길이 제한
    if (!idLength(id)) {
      idRef.current.innerHTML = "4글자 이상 16글자 이하로 입력해주세요.";
      idRef.current.style.display = "flex";
      success = false
    }
    // 아이디 영어 또는 숫자만 가능
    else if (!idEngNum(id)) {
      idRef.current.innerHTML = "영어 또는 숫자로만 입력해주세요.";
      idRef.current.style.display = "flex";
      success = false
    } else idRef.current.style.display = "none";

    // 비밀번호 8글자 이상, 영문, 숫자, 특수문자 사용
    if (!strongPassword(password)) {
      passwordRef.current.innerHTML =
        "8글자 이상, 영문, 숫자, 특수문자를 사용해주세요.";
      passwordRef.current.style.display = "flex";
      success = false
    } else passwordRef.current.style.display = "none";

    // 비밀번호 확인
    if (!isMatchPassword(password, passwordCheck)) {
      passwordCheckRef.current.innerHTML = "비밀번호와 일치하지 않습니다.";
      passwordCheckRef.current.style.display = "flex";
      success = false
    } else passwordCheckRef.current.style.display = "none";

    // 휴대폰 01(0, 1, 7) 으로 시작
    if (isPhone(phone)) {
      phoneRef.current.innerHTML = "010 으로 시작해야합니다.";
      phoneRef.current.style.display = "flex";
      success = false
    }
    // 휴대폰 길이 제한
    else if (!phoneLength(phone)) {
      phoneRef.current.innerHTML = "10글자 이상 11글자 이하로 입력해주세요.";
      phoneRef.current.style.display = "flex";
      success = false
    } else phoneRef.current.style.display = "none";

    // 학교 한글만 입력
    if (!schoolKo(school)) {
      schoolRef.current.innerHTML = "한글만 입력해주세요.";
      schoolRef.current.style.display = "flex";
      success = false
    }
    // 학교 길이 제한(20자 이하)
    else if (!schoolLength(school)) {
      schoolRef.current.innerHTML = "20자 이하로 입력해주세요.";
      schoolRef.current.style.display = "flex";
      success = false
    } else schoolRef.current.style.display = "none";


    // 모든 validation 이 통과되면 Django 에 회원가입 api 요청
    if (success) {
      fetch("https://pium.site/api/teachersignup/", {
        credentials: "include",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_id: id,
          pw: password,
          username: username,
          phone_num: phone,
          school_name: school,
        })
      }).then((res) => {
        if (res.status === 201) {
          nav(LINK.LOGIN);
        } else {
          // 응답 에러 처리
        }
      })
    }
  };

  return (
    <>
      <main>
        <img
          src={process.env.PUBLIC_URL + "/Leaf01.png"}
          alt="잎 이미지 01"
          css={signupMainImgStyle("18%", "24%")}
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/Leaf02.png"}
          alt="잎 이미지 02"
          css={signupMainImgStyle("73%", "66%")}
        ></img>
        <div style={{ width: "42rem", margin: "0 auto" }}>
          <section css={signupMainSectionWrapperStyle}>
            <UserInput
              type="text"
              placeholder="이름을 입력하세요."
              margin={margin}
              input={username}
              setInput={setUsername}
            />
            <span css={userInputGuideMsgStyle} ref={usernameRef}></span>
            <UserInput
              type="text"
              placeholder="아이디를 입력하세요."
              margin={margin}
              input={id}
              setInput={setId}
            />
            <span css={userInputGuideMsgStyle} ref={idRef}></span>
            <UserInput
              type="password"
              placeholder="비밀번호를 입력하세요."
              margin={margin}
              input={password}
              setInput={setPassword}
            />
            <span css={userInputGuideMsgStyle} ref={passwordRef}></span>
            <UserInput
              type="password"
              placeholder="비밀번호를 확인해주세요."
              margin={margin}
              input={passwordCheck}
              setInput={setPasswordCheck}
            />
            <span css={userInputGuideMsgStyle} ref={passwordCheckRef}></span>
            <UserInput
              type="text"
              placeholder="휴대폰 번호(숫자만 입력)"
              margin={margin}
              input={phone}
              setInput={setPhone}
            />
            <span css={userInputGuideMsgStyle} ref={phoneRef}></span>
            <UserInput
              type="text"
              placeholder="학교를 입력하세요."
              margin={margin}
              input={school}
              setInput={setSchool}
            />
            <span css={userInputGuideMsgStyle} ref={schoolRef}></span>
            <div style={{ height: "1.625rem" }}></div>
            <UserBtn
              text="회원가입"
              color={true}
              link={LINK.LOGIN}
              onClick={handleClickSignupBtn}
            />
          </section>
        </div>
      </main>
    </>
  );
};
