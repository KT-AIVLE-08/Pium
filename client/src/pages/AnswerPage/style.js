import { css } from '@emotion/react'
import { COLORS } from 'styles/colors'

export const main = css({
    margin: '0 7rem',
})

export const profileSection = css({
    display: 'flex',
    gap: "1rem",
    marginBottom: "5rem",
})

export const profileImageContainer = css({
    width: "150px",
    height: "150px",
    backgroundcolor: "#008573",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})

export const profileImage = css({
    width: "120px",
    height: "142px",
    borderRadius: "50px",
})

export const profileInfo =css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "flex-start",
    color : `${COLORS.LETTERCOLOR}`,
    fontWeight: "bold",
})

export const learningSection =css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    fontWeight: "bold",
})

export const learningHeading = css ({
    fontSize: "25px",
    color : `${COLORS.LETTERCOLOR}`
})

export const categoryHeading = css({
    fontSize: "20px",
    color: "#008573",
})

export const card = css ({
    backgroundColor: `${COLORS.SUBBACKGROUND}`,
    width: "1627px",
    borderRadius: "10px",
    display: "grid",
    fontWeight: "bold",
    height: "6.5rem",
    padding: "0 1.5rem",
    fontSize: "20px",
    marginBottom: "1rem",
    boxShadow: "0px 2px 8px rgba(99, 99, 99, 0.2)",
})

export const cardHeading = css({
    display: "flex",
    color: `${COLORS.LETTERCOLOR}`,
    height: "80px",
    alignItems: "center",
    marginLeft : "10px",
    width :"370px",
})

export const cardSubheading = css({
    display: "flex",
    color: `${COLORS.LETTERCOLOR}`,
    alignItems: "center",

})

export const cardActions = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // gridTemplateColumns: "5fr 5fr 1fr",
})

export const cardActionsImg = css({
    width: "25px",
    height: "25px",
    marginLeft : "20px"

})