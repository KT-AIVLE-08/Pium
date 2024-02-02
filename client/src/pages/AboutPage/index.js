/** @jsxImportSource @emotion/react */

import { profiles } from "utils/constants";
import { memberDivStyle, memberImgStyle, memeberWrapperStyle } from "./style";
import { COLORS } from "styles/colors";

export const AboutPage = () => {
  const p = profiles

  return (
    <>
      <main style={{ backgroundColor: "#FFFFFF" }}>
        {/* About us 이미지 */}
        <img
          src={process.env.PUBLIC_URL + "/pium/AboutUs.png"}
          alt="About us 이미지"
          style={{ width: "100%", marginBottom: "5rem", paddingRight: "4rem" }}
        />
        {/* 조원 사진 */}
        <MemberColumn profiles={p.slice(0, 3)}/>
        <MemberColumn profiles={p.slice(3, 6)}/>
      </main>
    </>
  );
};

const MemberColumn = (props) => {
  const profiles = props.profiles

  return (
    <>
      <div css={memeberWrapperStyle}>
        {profiles.map((p, i) => <Member key={i} profile={p} idx={i} />)}
      </div>
    </>
  );
};

const Member = (props) => {
  const profile = props.profile

  return (
    <>
      <div css={memberDivStyle}>
        <img src={process.env.PUBLIC_URL + profile.url} alt="프로필 이미지" css={memberImgStyle}/>
        <div style={{ padding: "1rem 1rem 1rem 3.25rem", fontWeight: "bold" }}>
          <div style={{ paddingBottom: "0.375rem" }}>{profile.name}</div>
          <div style={{ fontSize: "0.8rem", color: `${COLORS.GUIDETEXT}` }}>{profile.nameEn}</div>
          <div style={{ paddingTop: "1.5rem" }}>{profile.parts.map((part, i) => (
            <div key={i} style={{ paddingBottom: "0.5rem" }}>{part}</div>
          ))}</div>
        </div>
      </div>
    </>
  );
};
