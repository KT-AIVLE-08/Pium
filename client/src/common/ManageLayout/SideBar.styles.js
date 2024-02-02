import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const sideBarStyle = css({
  width: "24.5rem",
  height: "calc(100vh - 5.5rem)",
  display: "flex",
  flexDirection: "column",
})

export const sideBarItemStyle = (isColored) => css({
  fontSize: "1.25rem",
  margin: "0 2rem",
  padding: "1rem 2rem",
  borderBottom: `1px solid ${COLORS.BORDER}`,
  fontWeight: isColored ? "bold" : "none",
  color: isColored ? `${COLORS.PRIMARY_1}` : `${COLORS.BLACK}`,
  cursor: "pointer",
  fontWeight: "bold",

  "&:first-of-type": {
    marginTop: "50%",
  }
})