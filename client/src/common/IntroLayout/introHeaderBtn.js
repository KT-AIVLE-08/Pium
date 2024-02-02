/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { css } from "@emotion/react";

import { AUTHOR, LINK } from "utils/constants";
import { COLORS } from "styles/colors";
import { userState } from "store/userState";

export const IntroHeaderBtn = (props) => {
  const nav = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleClickBtn = (e, link) => {
    if (link === window.location.pathname) return;
    if (link === LINK.INTRO) nav(LINK.INTRO);
    if (link === LINK.ABOUT) nav(LINK.ABOUT);
    if (link === LINK.LOGIN) nav(LINK.LOGIN);
    if (link === LINK.STUDY) nav(LINK.STUDY);
    if (link === LINK.TRIAL) nav(LINK.TRIAL);
    if (link === LINK.MANAGE) nav(LINK.MANAGESCENARIO);
    if (link === LINK.LOGOUT) {
      window.localStorage.removeItem("token");
      setUser({
        author: AUTHOR.ANONYMOUS,
        user_id: -1,
        school_id: -1,
      });
    }
  };

  return (
    <>
      <button
        type="button"
        css={
          props.study
            ? introHeaderStudyButtonWrapperStyle(props.isColored)
            : introHeaderBtnWrapperStyle
        }
        onClick={(e) => handleClickBtn(e, props.link)}
      >
        {props.name}
      </button>
    </>
  );
};

const introHeaderBtnWrapperStyle = css({
  display: "block",
  border: "none",
  width: "100%",
  backgroundColor: COLORS.BACKGROUND,
  fontSize: "1.75rem",
  padding: "3rem 0",
  margin: "0 auto",
  fontWeight: "bold",

  "&:hover": {
    color: `${COLORS.PRIMARY_1}`,
  },
});

const introHeaderStudyButtonWrapperStyle = (isColored) =>
  css({
    fontSize: "1.75rem",
    display: "block",
    backgroundColor: isColored ? COLORS.PRIMARY_1 : COLORS.BACKGROUND,
    color: isColored ? COLORS.BACKGROUND : COLORS.BLACK,
    padding: "0.875rem 3.375rem",
    margin: "2rem auto",
    border: isColored
      ? `0.188rem solid ${COLORS.BACKGROUND}`
      : `0.188rem solid ${COLORS.BLACK}`,
    borderRadius: "3.125rem",
    boxShadow: `0.063rem 0.125rem 0.125rem 0 ${COLORS.SHADOW}`,
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "rgba(0, 133, 115, 0.13)",
      color: `${COLORS.BLACK}`,
    },
  });
