/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const UserBtn = (props) => {
  return (
    <>
      <button
        type="button"
        css={userBtnStyle(props.color)}
        onClick={() => props.onClick(props.link)}
      >
        {props.text}
      </button>
    </>
  );
};

const userBtnStyle = (isColored) =>
  css({
    width: "22rem",
    display: "block",
    padding: "1.313rem 0",
    fontSize: "1.25rem",
    border: `0.188rem solid ${COLORS.BLACK}`,
    borderRadius: "3.125rem",
    color: isColored ? COLORS.BACKGROUND : COLORS.BLACK,
    backgroundColor: isColored ? COLORS.PRIMARY_1 : COLORS.BACKGROUND,
    margin: "1.75rem auto",
    fontWeight: "bold",
  });
