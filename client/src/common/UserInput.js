/** @jsxImportSource @emotion/react */

import { useRef } from "react";

import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const UserInput = (props) => {
  const inputRef = useRef();

  return (
    <>
      <input
        type={props.type}
        ref={inputRef}
        placeholder={props.placeholder}
        css={userInputStyle(props.margin)}
        onChange={() => props.setInput(inputRef.current.value)}
      ></input>
    </>
  );
};

const userInputStyle = (marginValue) =>
  css({
    width: "30.875rem",
    margin: `${marginValue} auto 0.6rem auto`,
    display: "block",
    fontSize: "1.25rem",
    border: "none",
    borderBottom: `0.125rem solid ${COLORS.PRIMARY_1}`,
    padding: "0.5rem 0.75rem",
    backgroundColor: `${COLORS.BACKGROUND}`,
    fontWeight: "bold",

    "::placeholder": {
      color: `${COLORS.PLACEHOLDER}`,
    },
  });

export const userInputGuideMsgStyle = css({
  display: "none",
  position: "absolute",
  fontSize: "1.25rem",
  color: `${COLORS.FAILURE}`,
  left: "8.375rem",
});
