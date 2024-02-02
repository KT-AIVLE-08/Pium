/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { LINK } from "utils/constants";
import {
  introHeaderLogoStyle,
  introHeaderLogoWrapperStyle,
  introHeaderWrapperStyle,
} from "./IntroHeader.styles";
import { IntroHeaderBtn } from "./introHeaderBtn";
import { userState } from "store/userState";

export const IntroHeader = () => {
  const user = useRecoilValue(userState)

  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (user.user_id === -1) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, [user])

  return (
    <>
      <header css={introHeaderWrapperStyle}>
        <div css={introHeaderLogoWrapperStyle}>
          <img
            src={process.env.PUBLIC_URL + '/pium/Logo.png'}
            alt="로고 이미지"
            css={introHeaderLogoStyle}
          />
        </div>
        <div>
          <IntroHeaderBtn link={LINK.INTRO} name="홈" study={false} />
          <IntroHeaderBtn link={LINK.ABOUT} name="소개" study={false} />
          {
            login
            ? <IntroHeaderBtn link={LINK.LOGOUT} name="로그아웃" study={false} />
            : <IntroHeaderBtn link={LINK.LOGIN} name="로그인" study={false} />
          }
          
        </div>
        <div>
          <IntroHeaderBtn
            link={LINK.STUDY}
            name="학습하기"
            study={true}
            isColored={true}
          />
          { user.author === 'teacher' ? (
            <IntroHeaderBtn
              link= {LINK.MANAGE}
              name="관리하기"
              study={true}
              isColored={false}
              /> 
            ) : (
            <IntroHeaderBtn
              link={LINK.TRIAL}
              name="체험하기"
              study={true}
              isColored={false}
            />
            )}
        </div>
      </header>
    </>
  );
};
