import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const signupMainSectionWrapperStyle = css({
  width: "42rem",
  height: "50rem",
  boxShadow: `0.063rem 0.063rem 0.125rem 0 ${COLORS.SHADOW}, -0.063rem 0 0.125rem 0 ${COLORS.SHADOW}`,
  borderRadius: "3.125rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
  position: "relative",
  zIndex: "2",
  display: "table-cell",
  verticalAlign: "middle",
});

export const signupMainImgStyle = (top, left) =>
  css({
    position: "absolute",
    zIndex: "1",
    top: top,
    left: left,
  });
