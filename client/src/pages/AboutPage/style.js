import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const memeberWrapperStyle = css({
  width: "70%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  margin: "0 auto 2rem auto",
})

export const memberDivStyle = css({
  margin: "0 6rem 0 6rem",
  width: "30%",
  height: "10rem",
  backgroundColor: `${COLORS.SUBBACKGROUND}`,
  position: "relative",
})

export const memberImgStyle = css({
  width: "6.5rem",
  position: "absolute",
  left: "-24%",
  top: "8%",
})

