import { css } from '@emotion/react'

import { COLORS } from 'styles/colors'

export const mainTitleStyle = css({
  fontSize: "2.25rem",
  fontWeight: "bold",
  color: `${COLORS.PRIMARY_1}`,
  margin: "4rem 0 2rem 1.5rem",
})

export const mainSectionStyle = css({
  width: "calc(100vw - 28rem)",
  height: "calc(100% - 12.625rem)",
  margin: "2rem 4rem 4rem 0",
  padding: "1rem",
  backgroundColor: `${COLORS.BACKGROUND}`,
  borderRadius: "0.75rem",
})

export const mainSectionBtnStyle = css({
  padding: "0.5rem 1.5rem",
  fontSize: "1rem",
  display: "flex",
  marginLeft: "auto",
  alignItems: "center",
  justifyContent: "space-between",
  border: `1px solid ${COLORS.BORDER}`,
  borderRadius: "0.75rem",
})

export const mainSectionContentStyle = css({
  width: "100%",
  height: "calc(100% - 6rem)",
  margin: "1rem auto",
})

export const tableHeaderStyle = css({
  verticalAlign: "middle",
  paddingLeft: "0.5rem",
  border: `1px solid ${COLORS.BORDER}`,
  fontWeight: "bold",
})

export const tableBodyStyle = css({
  verticalAlign: "middle",
  border: `1px solid ${COLORS.BORDER}`,
  paddingLeft: "0.5rem",
})

export const tableBodyImgStyle = css({
  width: "2rem",
  marginRight: "0.5rem",
  cursor: "pointer",
})

export const badgeWrapperStyle = css({
  width: "max-content",
  padding: "0.5rem 1rem",
  fontWeight: "bold",
  borderRadius: "0.8rem",
})

export const easyBadgeStyle = css({
  color: "#4c8ac0",
  backgroundColor: "#e5eff9",
})

export const normalBadgeStyle = css({
  color: "#ef8c47",
  backgroundColor: "#fff7e1",
})

export const hardBadgeStyle = css({
  color: "#ff0505",
  backgroundColor: "#ffdcdc",
})

export const paginationStyle = css({
  fontSize: "1.5rem",
  textAlign: "center",
  fontWeight: "bold",
})