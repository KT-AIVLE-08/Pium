import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const consentMainSectionWrapperStyle = css({
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

export const consentMainImgStyle = (top, left) =>
  css({
    position: "absolute",
    zIndex: "1",
    top: top,
    left: left,
  });

export const consentDivStyle = css({
  width: "calc(100% - 2rem)",
  height: "38%",
  margin: "0.5rem 1rem",
  fontWeight: "bold",
  boxSizing: "border-box",
})

export const consentSubTitleStyle = css({
  padding: "0.125rem 0.25rem 0.25rem 0.25rem",
  borderBottom: `1px solid ${COLORS.BORDER}`,
  color: `${COLORS.PRIMARY_1}`,
})

export const consentContentStyle = css({
  width: "100%",
  height: "15rem",
  overflowY: "scroll",
  whiteSpace: "pre-wrap",
})

export const consentLabel = css({
  float: "right",
  margin: "1rem 0",
  cursor: "pointer",
})

export const consentCheckbox = css({
  verticalAlign: "middle",
  marginLeft: "0.5rem",
})