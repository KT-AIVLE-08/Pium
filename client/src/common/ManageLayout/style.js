import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const manageHeaderWapperStyle = css({
  width: "100%",
  height: "5.5rem",
  position: "fixed",
  top: "0",
  backgroundColor: COLORS.BACKGROUND,
});

export const manageHeaderTopStyle = css({
  height: "1.75rem",
  display: "flex",
  justifyContent: "space-between",
  margin: "0.25rem 0",
  fontSize: "1.25rem",
  padding: "0 1rem",
  borderBottom: `1px solid ${COLORS.BORDER_2}`,
});

export const manageHeaderBottomStyle = css({
  width: "100%",
  height: "3.5rem",
  padding: "0.75rem 28rem",
  fontSize: "1.25rem",
});

export const manageHeaderBtnStyle = (isBorderBottom) => css({
  height: "2.5rem",
  width: "max-content",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 2rem",
  cursor: "pointer",

  borderBottom: isBorderBottom ? `0.125rem solid ${COLORS.PRIMARY_1}` : "none"
})

export const manageHeaderImgSize = css({
  width: "1.75rem",
  height: "1.75rem",
  marginRight: "0.75rem",
})
