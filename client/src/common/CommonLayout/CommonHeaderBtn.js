/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { AUTHOR, LINK } from "utils/constants";
import { COLORS } from "styles/colors";
import { userState } from "store/userState";

export const CommonHeaderBtn = (props) => {
  const nav = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleClickBtn = (e, link) => {
    if (link === window.location.pathname) return;
    if (link === LINK.INTRO) nav(LINK.INTRO);
    if (link === LINK.ABOUT) nav(LINK.ABOUT);
    if (link === LINK.LOGIN) nav(LINK.LOGIN);
    if (link === LINK.LOGOUT) {
      window.localStorage.removeItem("token");
      setUser({
        author: AUTHOR.ANONYMOUS,
        user_id: -1,
        school_id: -1,
      });
      if (window.location.pathname === LINK.STUDY) {
        nav(LINK.INTRO);
      }
    }
  };

  return (
    <>
      {props.link === window.location.pathname ? (
        <button
          type="button"
          css={commonHeaderBtnWrapperStyle}
          style={{ borderBottom: `2px solid ${COLORS.PRIMARY_1}` }}
          onClick={(e) => handleClickBtn(e, props.link)}
        >
          {props.text}
        </button>
      ) : (
        <button
          type="button"
          css={commonHeaderBtnWrapperStyle}
          onClick={(e) => handleClickBtn(e, props.link)}
        >
          {props.text}
        </button>
      )}
    </>
  );
};

const commonHeaderBtnWrapperStyle = css({
  width: "11.25rem",
  fontSize: "1.5rem",
  padding: "2.325rem 2.5rem 2.75rem 2.5rem",
  color: `${COLORS.BLACK}`,
  fontWeight: "bold",

  "&:hover": {
    color: `${COLORS.PRIMARY_1}`
  },
});
