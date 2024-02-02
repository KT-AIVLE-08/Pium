import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const studyMainBackgroundStyle = css({
  width: "100%",
  height: "53.25rem",
  position: "absolute",
});

export const studyMainBackgroundTopLeftStyle = css({
  width: "50rem",
  height: "7.25rem",
  backgroundColor: `${COLORS.SUBBACKGROUND}`,
});

export const studyMainBackgroundTopRightStyle = css({
  width: "0",
  height: "0",
  borderRight: "5.75rem solid transparent",
  borderBottom: `7.25rem solid ${COLORS.SUBBACKGROUND}`,
});

export const studyMainBackgroundBottomStyle = css({
  width: "100%",
  height: "45rem",
  backgroundColor: `${COLORS.SUBBACKGROUND}`,
});

export const studyMainSubSectionStyle = css({
  zIndex: "2",
  position: "relative",
  display: "flex",
  width: "112rem",
  height: "7.25rem",
  justifyContent: "space-between",
  margin: "0 4rem",
  alignItems: "center",
});

export const studyMainSubTitleStyle = css({
  color: `${COLORS.PRIMARY_1}`,
  fontSize: "3.25rem",
  fontWeight: "bold",
});

export const studyMainCategoryDropdownBtnStyle = css({
  width: "10.25rem",
  fontSize: "1rem",
  padding: "0.75rem 1.25rem",
  border: `0.063rem solid ${COLORS.BORDER}`,
  borderRadius: "0.625rem",
  fontWeight: "bold",
});

export const displayFlexStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const studyMainCategoryDropdownStyle = css({
  width: "10.25rem",
  position: "absolute",
  top: "5.5rem",
  right: "8.188rem",
  fontSize: "1rem",
  fontWeight: "bold",
  backgroundColor: `${COLORS.BACKGROUND}`,
  border: `0.063rem solid ${COLORS.BORDER}`,
  borderRadius: "0.625rem",
});

export const studyMainCategoryDropdownLiStyle = css({
  padding: "1rem 1.063rem",
  borderBottom: `0.063rem solid ${COLORS.BORDER}`,

  ":last-child": {
    borderBottom: "none",
  },
});

export const studyMainCategoryBtnStyle = css({
  fontSize: "1rem",
  height: "3.125rem",
  padding: "0.75rem 1.25rem",
  color: `${COLORS.BACKGROUND}`,
  backgroundColor: `${COLORS.PRIMARY_1}`,
  borderRadius: "0.625rem",
  margin: "1rem",
  fontWeight: "bold",
});

export const studyMainScenarioListStyle = css({
  width: "100%",
  height: "41rem",
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

export const studyMainPaginationStyle = css({
  zIndex: "2",
  position: "relative",
  fontSize: "2rem",
  textAlign: "center",
  fontWeight: "bold",
  cursor : "pointer",
});

export const studyMainPaginationLiStyle = (page, item) =>
  css({
    display: "inline-block",
    padding: "0 0.5rem",
    color: page === item ? `${COLORS.PRIMARY_1}` : `${COLORS.BLACK}`,
  });
