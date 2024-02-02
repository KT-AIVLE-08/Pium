/** @jsxImportSource @emotion/react */

import { footerImgStyle, footerImgWrapperStyle, footerWrapperStyle } from "./style";

const footerContent = [
  "KT AIVLE 08조. 최민혁 김영식 김태희 이종상 한유리 전세연",
  "2024 KT Corp. All rights reserved",
]

export const Footer = () => {
  return (
    <>
      <footer css={footerWrapperStyle}>
        <div style={{ margin: "1.5rem 0" }}>
          {footerContent.map((c, i) => (
            <p key={i} style={{ margin: "0.5rem 0 0.5rem 4rem" }}>{c}</p>
          ))}
        </div>
        <div css={footerImgWrapperStyle}>
          <img
            src={process.env.PUBLIC_URL + "/pium/kt-logo.png"} alt="KT 로고"
            css={footerImgStyle}
            onClick={() => window.open("https://www.kt.com/", "_blank", "noopener, noreferrer")}
          />
          <img
            src={process.env.PUBLIC_URL + "/pium/aivle-logo.png"} alt="Aivle 로고"
            css={footerImgStyle}
            onClick={() => window.open("https://aivle.kt.co.kr/home/main/indexMain", "_blank", "noopener, noreferrer")}
          />
          <img
            src={process.env.PUBLIC_URL + "/pium/Logo-tight.png"} alt="피움 로고"
            css={footerImgStyle}
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </footer>
    </>
  );
};
