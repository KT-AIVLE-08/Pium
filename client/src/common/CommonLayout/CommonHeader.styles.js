import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const commonHeaderWrapperStyle = css({
  width: "100%",
  height: "5.125rem",
  display: "flex",
  justifyContent: "space-between",
  position: "fixed",
  backgroundColor: COLORS.BACKGROUND,
});

export const commonHeaderTopWrapperStyle = css({
  width: "100%",
  height: "5.125rem",
  display: "flex",
  justifyContent: "space-between",
  position: "fixed",
  backgroundColor: COLORS.BACKGROUND,
  boxShadow: `0 0.125rem 0.125rem 0 ${COLORS.SHADOW}`,
  zIndex: "3",
});

export const commonHeaderLogoStyle = css({
  marginLeft: "3.5rem",
});
