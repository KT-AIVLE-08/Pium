import { css } from "@emotion/react";

import { COLORS } from "styles/colors";

export const scenarioHeaderWrapperStyle = css({
  display: "flex",
  justifyContent: "space-between",
  margin: "2.5rem 2rem 1rem 2rem",
});

export const scenarioCategoryStyle = css({
  width: "max-content",
  textAlign: "center",
  fontSize: "1.5rem",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
});

export const scenarioSupportBtnStyle = css({
  width: "9rem",
  height: "3rem",
  padding: "0.5rem 0.75rem 0.5rem 1rem",
  marginRight: "1rem",
  fontSize: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: `0.063rem solid ${COLORS.PRIMARY_1}`,
  borderRadius: "0.75rem",
  backgroundColor: `${COLORS.SUBBACKGROUND}`,
  fontWeight: "bold",
});

export const scenarioRemainCountWrapperStyle = css({
  width: "3rem",
  height: "3rem",
  textAlign: "center",
  padding: "1rem",
  fontSize: "1rem",
  marginRight: "2rem",
  border: `0.063rem solid ${COLORS.PRIMARY_1}`,
  borderRadius: "0.75rem",
  backgroundColor: `${COLORS.SUBBACKGROUND}`,
  fontWeight: "bold",
});

export const scenarioQuestionBackgroundImgStyle = css({
  width: "120rem",
  height: "52.563rem",
  display: "flex",
  zIndex: "0",
  position: "absolute",
  opacity: "70%",
});

export const scenarioQuestionWrapperStyle = css({
  width: "100%",
  height: "52.563rem",
  paddingTop: "6rem",
  position: "relative",
  zIndex: "1",
});

export const scenarioQuestionStyle = css({
  width: "max-content",
  margin: "0 auto",
  padding: "1.063rem 4rem 0.938rem 4rem",
  borderRadius: "1.563rem",
  fontSize: "3rem",
  color: `${COLORS.PRIMARY_1}`,
  backgroundColor: `${COLORS.SUBBACKGROUND_75}`,
  fontWeight: "bold",
  maxWidth: "90%",
  wordBreak: "keep-all",
});

export const scenarioMultipleExampleWapperStyle = css({
  width: "70%",
  margin: "6rem auto",
  padding: "1rem 4rem",
  borderRadius: "1.563rem",
  backgroundColor: `${COLORS.SUBBACKGROUND_75}`,
})

export const scenarioMultipleExampleStyle = css({
  width: "100%",
  margin: "4rem auto",
  fontSize: "2.25rem",
  color: `${COLORS.BLACK}`,
  fontWeight: "bold",

  "&:hover": {
    color: `${COLORS.PRIMARY_1}`
  }
})

export const scenarioGuideMsgStyle = css({
  width: "max-content",
  margin: "17.875rem auto 0 auto",
  padding: "1.063rem 3.625rem 0.938rem 3.625rem",
  fontSize: "2.25rem",
  color: `${COLORS.GUIDETEXT}`,
  backgroundColor: `${COLORS.SUBBACKGROUND_75}`,
  borderRadius: "1.563rem",
  fontWeight: "bold",
});

export const scenarioMikeBtnStyle = css({
  width: "max-content",
  margin: "2.5rem auto",
  padding: "1.125rem 1.063rem 1rem 1.063rem",
  display: "flex",
  backgroundColor: `${COLORS.SUBBACKGROUND_75}`,
  border: `0.125rem solid ${COLORS.PRIMARY_1}`,
  borderRadius: "100%",
});

export const scenarioSupportBtnColoredStyle = css({
  width: "18rem",
  height: "5.625rem",
  padding: "1.5rem 1.25rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.75rem",
  borderRadius: "1.25rem",
  color: `${COLORS.BACKGROUND}`,
  backgroundColor: `${COLORS.PRIMARY_1}`,
  margin: "0 auto",
  fontWeight: "bold",
});

export const scenarioRetryMsgStyle = css({
  fontSize: "3.5rem",
  fontWeight: "bold",
  color: `${COLORS.FAILURE}`,
  padding: "1rem 6.875rem",
  backgroundColor: `${COLORS.SUBBACKGROUND_75}`,
  borderRadius: "1.25rem",
  position: "absolute",
  top: "calc(59.063rem - 50%)",
  left: "37rem",
  zIndex: "1",
  display: "none",
})