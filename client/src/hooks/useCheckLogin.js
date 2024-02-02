import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { userState } from "store/userState";

import { AUTHOR, LINK } from "utils/constants";

export const useCheckLogin = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [user, setUser] = useRecoilState(userState);
  
  useEffect(() => {
    // 로컬스토리지에 토큰이 없으면 현재 pathname 에 따라 현재 페이지 유지 또는 로그인 페이지로 이동
    if (window.localStorage.getItem("token") === null) {
      const pathname = location.pathname
      if (pathname === LINK.INTRO || pathname === LINK.ABOUT || pathname === LINK.CONSENT ||
        pathname === LINK.TRIAL || pathname === LINK.LOGIN || pathname === LINK.SIGNUP)
        return ;
      else {
        nav(LINK.LOGIN);
        return ;
      }
    }

    fetch("https://pium.site/api/token/", {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": window.localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 202) {
        return res.json();
      } else {
        nav(LINK.LOGIN);
        window.localStorage.removeItem("token");
        setUser({
          author: AUTHOR.ANONYMOUS,
          user_id: -1,
          school_id: -1,
        })
      }
    }).then((data) => {
      setUser({
        author: data.type === "teacher" ? AUTHOR.TEACHER : AUTHOR.STUDENT,
        user_id: data.user_id,
        school_id: data.school_id,
      })
    }).catch(() => {
      nav(LINK.LOGIN);
      window.localStorage.removeItem("token");
      setUser({
        author: AUTHOR.ANONYMOUS,
        user_id: -1,
        school_id: -1,
      })
    })
  }, [location]);
};
