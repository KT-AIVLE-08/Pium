/** @jsxImportSource @emotion/react */

import {
  introMainContentStyle,
  introMainImgStyle,
  introMainPatternStyle,
  introMainWrapperStyle,
} from "./style";

export const IntroPage = () => {
  return (
    <>
      <main css={introMainWrapperStyle}>
        <div css={introMainPatternStyle}></div>
        <div style={{ position: "relative", zIndex: "2" }} onContextMenu={(e) => e.preventDefault()}>
          <video css={introMainImgStyle} loop autoPlay muted controls controlsList="nodownload"
            onClick={(e) => {
              e.target.muted = false;
            }}
          >
            <source
              src={process.env.PUBLIC_URL + "/pium/video/Ad_video.mp4"}
              type="video/mp4"
            />
          </video>
          <p css={introMainContentStyle}>
            희망의 씨앗을 움퉈, 사회를 향한 성장과 발전을 돋아,
          </p>
          <p css={introMainContentStyle}>
            모두의 꿈 망울이 피어나길. 피움이 함께합니다.
          </p>
        </div>
      </main>
    </>
  );
};
