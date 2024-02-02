import { css } from '@emotion/react'

import { COLORS } from 'styles/colors'

export const mainTitleStyle = css({
  fontSize: "2.25rem",
  fontWeight: "bold",
  color: `${COLORS.BLACK}`,
  margin: "4rem 0 2rem 1.5rem",
})

export const mainTitleBtnWrapper = css({
  margin: "4rem 0 2rem 0",
  position: "relative",
})

// 공개 여부 버튼 및 드롭다운
export const publicDropdownUlStyle = css({
  fontSize: "1.063rem",
  fontWeight: "bold",
  width: "7.313rem",
  position: "absolute",
  top: "2.625rem",

  border: `1px solid ${COLORS.BORDER}`,
  borderRadius: "0.375rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
  display: "none",
  zIndex: "1",
})

export const publicDropdownLiStyle = css({
  width: "100%",
  height: "2.375rem",
  padding: "0.5rem 1rem",
  cursor: "pointer",

  borderBottom: `1px solid ${COLORS.BORDER}`,
  "&:last-of-type": {
    borderBottom: "none",
  }
})

export const publicBtnStyle = css({
  width: "7.313rem",
  fontSize: "1.063rem",
  padding: "0.5rem 1rem",
  marginRight: "1rem",

  border: `1px solid ${COLORS.BORDER}`,
  borderRadius: "0.375rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
})

export const publicBtnTextStyle = css({
  display: "inline-block",
  width: "3.188rem",
  textAlign: "left",
  fontWeight: "bold",
})

export const publicBtnImgStyle = css({
  width: "1rem",
  marginLeft: "1rem",
})

// 생성 완료 버튼
export const completeBtnStyle = css({
  fontSize: "1.063rem",
  padding: "0.5rem 1rem",
  fontWeight: "bold",

  color: `${COLORS.BACKGROUND}`,
  backgroundColor: `${COLORS.PRIMARY_1}`,
  borderRadius: "0.375rem",
})

// 대표 이미지
export const representImgLabelStyle = css({
  height: "15rem",
  marginRight: "1rem",
  display: "block",
  color: `${COLORS.PLACEHOLDER}`,
  fontWeight: "bold",
})

// 카테고리 선택 버튼
export const categoryBtnStyle = css({
  fontSize: "1.063rem",
  width: "50%",
  marginRight: "1rem",
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
})

export const categoryDropdownUlStyle = css({
  width: "calc(50% - 0.5rem)",
  position: "absolute",
  top: "3.625rem",
  fontWeight: "bold",

  border: `1px solid ${COLORS.BORDER}`,
  borderRadius: "0.375rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
  display: "none",
  zIndex: "1",
})

export const categoryDropdownLiStyle = css({
  width: "100%",
  height: "3rem",
  padding: "1rem 1rem 0.5rem 1rem",
  cursor: "pointer",

  borderBottom: `1px solid ${COLORS.BORDER}`,
  "&:last-of-type": {
    borderBottom: "none",
  }
})

// 난이도 선택 버튼
export const levelBtnStyle = css({
  fontSize: "1.063rem",
  width: "50%",
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
})

export const levelDropdownUlStyle = css({
  width: "calc(50% - 0.5rem)",
  position: "absolute",
  top: "3.625rem",
  right: "0",
  fontWeight: "bold",

  border: `1px solid ${COLORS.BORDER}`,
  borderRadius: "0.375rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
  display: "none",
  zIndex: "1",
})

// 시나리오 제목
export const scenarioTitleStyle = css({
  fontSize: "1.063rem",
  border: "none",
  display: "block",
  width: "calc(100% - 2.125rem)",
  fontWeight: "bold",
})

// 시나리오 설명
export const scenarioDescribeStyle = css({
  fontSize: "1.063rem",
  width: "calc(100% - 2.125rem)",
  height: "4.875rem",
  display: "block",
  fontWeight: "bold",
})

// 문항
export const questionStyle = css({
  display: "flex",
  justifyContent: "space-between",
})

export const questionInputStyle = css({
  width: "80%",
  fontSize: "1.063rem",
  padding: "0.5rem 1rem",
  marginBottom: "1rem",
  display: "block",
  fontWeight: "bold",

  border: "none",
  borderBottom: `1px solid ${COLORS.PLACEHOLDER}`,
  backgroundColor: `${COLORS.BACKGROUND}`,

  "&:last-of-type": {
    marginBottom: "0",
  }
})

export const questionDeleteBtnStyle = css({
  padding: "0.5rem",
  float: "right",
})

export const questionImgLabelStyle = css({
  display: "block",
  height: "calc(100% - 3.125rem)",
  marginTop: "3.125rem",
})

// 문항 추가 버튼
export const addQstBtnStyle = css({
  fontSize: "1.063rem",
  fontWeight: "bold",
  padding: "0.75rem 2rem",
  marginLeft: "1.25rem",
  position: "fixed",
  bottom: "2rem",
  right: "3.125rem",
  color: `${COLORS.PRIMARY_1}`,

  backgroundColor: `${COLORS.BACKGROUND}`,
  border: `2px solid ${COLORS.PRIMARY_1}`,
  borderRadius: "1rem",
})

// PostScenarioPage 내에 공용 css

export const backgroundWrapper = css({
  backgroundColor: `${COLORS.BACKGROUND}`,
  border: `0.5px solid ${COLORS.BORDER}`,
  borderRadius: "0.5rem",
  padding: "1rem 1rem",
  marginBottom: "0.5rem",
})

export const placeholderStyle = css({
  "::placeholder": {
    fontSize: "1.063rem",
    color: `${COLORS.PLACEHOLDER}`,
  }
})