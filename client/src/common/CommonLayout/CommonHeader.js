/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  commonHeaderLogoStyle,
  commonHeaderTopWrapperStyle,
  commonHeaderWrapperStyle,
} from "./CommonHeader.styles";
import { userState } from "store/userState";
import { AUTHOR, LINK } from "utils/constants";
import { CommonHeaderBtn } from "./CommonHeaderBtn";

export const CommonHeader = () => {
  const nav = useNavigate();
  const [scroll, setScroll] = useState(true);
  const user = useRecoilValue(userState);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleClickBtn = () => {
    nav(LINK.INTRO);
  };

  return (
    <>
      <header
        css={scroll ? commonHeaderWrapperStyle : commonHeaderTopWrapperStyle}
      >
        <img
          src={process.env.PUBLIC_URL + "/pium/Logo.png"}
          alt="로고"
          css={commonHeaderLogoStyle}
          onClick={() => handleClickBtn()}
        ></img>
        <div
          style={{
            width: "48.75rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CommonHeaderBtn text="홈" link={LINK.INTRO} />
          <CommonHeaderBtn text="소개" link={LINK.ABOUT} />
          {user.author === AUTHOR.ANONYMOUS ? (
            <CommonHeaderBtn text="로그인" link={LINK.LOGIN} />
          ) : (
            <CommonHeaderBtn text="로그아웃" link={LINK.LOGOUT} />
          )}
        </div>
        <div style={{ width: "13.25rem" }}></div>
      </header>
    </>
  );
};
