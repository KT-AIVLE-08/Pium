import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const scenarioWrapperStyle = css({
  width: "27.125rem",
  height: "31.25rem",
  margin: "6.25rem 4.75rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
  borderRadius: "0.625rem",
  boxShadow: `0.063rem 0.125rem 0.125rem 0 ${COLORS.SHADOW}`,
});

export const scenarioLevelStyle = css({
  width: "max-content",
  padding: "0.438rem 3.125rem",
  backgroundColor: COLORS.PRIMARY_1,
  fontWeight: "bold",
  fontSize: "1.25rem",
  borderRadius: "0.625rem",
  color: `${COLORS.BACKGROUND}`,
  position: "absolute",
});

export const scenarioTitleStyle = css({
  fontSize: "1.875rem",
  fontWeight: "bold",
});

export const scenarioDescribeStyle = css({
  height: "3rem",
  fontSize: "1.125rem",
  wordBreak: "keep-all",
  marginTop: "2.625rem",
});

export const scenarioArrowWrapStyle = css({
  width: "2rem",
  height: "2rem",
  marginLeft: "auto",
  marginRight: "1.875rem",
});

export const scenarioArrowImgStyle = css({
  width: "75%",
  height: "75%",
  margin: "12.5%",
  filter:
    "invert(38%) sepia(23%) saturate(2232%) hue-rotate(130deg) brightness(96%) contrast(101%)",
});
