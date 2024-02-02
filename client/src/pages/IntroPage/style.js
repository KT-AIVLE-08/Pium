import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const introMainWrapperStyle = css({
  width: "71.7%",
  position: "relative",
});

export const introMainImgStyle = css({
  width: "70%",
  display: "block",
  margin: "0 auto",
  padding: "9.125rem 0 1.25rem 0",
});

export const introMainContentStyle = css({
  fontSize: "1.5rem",
  width: "70%",
  textAlign: "right",
  padding: "0.375rem 0",
  margin: "0 auto",
  fontWeight: "bold",
});

export const introMainPatternStyle = css({
  width: "75%",
  height: "100%",
  position: "absolute",
  top: "0",
  right: "0",
  backgroundColor: `${COLORS.PRIMARY_1}`,
  opacity: "0.13",
  zIndex: "1",
});
