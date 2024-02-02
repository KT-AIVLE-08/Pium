/** @jsxImportSource @emotion/react */

import { useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { LINK, personalInfoConsent, policyOfUtilization } from "utils/constants";
import {
  consentCheckbox,
  consentContentStyle,
  consentDivStyle,
  consentLabel,
  consentMainImgStyle,
  consentMainSectionWrapperStyle,
  consentSubTitleStyle
} from "./style";
import { consentState } from "store/userState";
import { UserBtn } from "common/UserBtn";

export const ConsentPage = () => {
  const [consent, setConsent] = useRecoilState(consentState);

  const nav = useNavigate();

  const personalRef = useRef();
  const policyRef = useRef();

  const handleClickBtn = (link) => {
    if (consent.personal === true && consent.policy === true) {
      nav(link)
    } else {
      alert("개인정보처리방침, 이용약관 동의란에 체크해주세요.")
    }
  }

  return (
    <>
      <main>
        <img
          src={process.env.PUBLIC_URL + "/Leaf01.png"}
          alt="잎 이미지 01"
          css={consentMainImgStyle("18%", "24%")}
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/Leaf02.png"}
          alt="잎 이미지 02"
          css={consentMainImgStyle("73%", "66%")}
        ></img>
        <div style={{ width: "42rem", margin: "0 auto" }}>
          <section css={consentMainSectionWrapperStyle}>
            <div css={consentDivStyle}>
              <div css={consentSubTitleStyle}>개인정보처리방침</div>
              <div css={consentContentStyle}>{personalInfoConsent}</div>
              <label css={consentLabel} htmlFor="checkbox-1">
                동의합니다.
                <input type="checkbox" css={consentCheckbox} id="checkbox-1" ref={personalRef}
                  onClick={(e) => {
                    setConsent({...consent, personal: e.target.checked})
                  }}
                />
              </label>
            </div>
            <div css={consentDivStyle}>
              <div css={consentSubTitleStyle}>이용약관</div>
              <div css={consentContentStyle}>{policyOfUtilization}</div>
              <label css={consentLabel} htmlFor="checkbox-2">
                동의합니다.
                <input type="checkbox" css={consentCheckbox} id="checkbox-2" ref={policyRef}
                  onClick={(e) => {
                    setConsent({...consent, policy: e.target.checked})
                  }}
                />
              </label>
            </div>
            <UserBtn
              text="동의하고 가입하기"
              color={true}
              link={LINK.SIGNUP}
              onClick={handleClickBtn}
            />
          </section>
        </div>
      </main>
    </>
  );
};
