/** @jsxImportSource @emotion/react */

import { Outlet, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  manageHeaderBottomStyle,
  manageHeaderBtnStyle,
  manageHeaderImgSize,
  manageHeaderTopStyle,
  manageHeaderWapperStyle
} from "./style";
import { AUTHOR, LINK } from "utils/constants";
import { userState } from "store/userState";

export const ManageLayout = () => {
  return (
    <>
      <ManageHeader />
      <div style={{ marginTop: "5.5rem" }}>
        <Outlet />
      </div>
    </>
  );
};

const ManageHeader = () => {
  const nav = useNavigate();
  const setUser = useSetRecoilState(userState);
  
  return (
    <>
      <header css={manageHeaderWapperStyle}>
        <section css={manageHeaderTopStyle}>
          <div
            onClick={() => nav(LINK.INTRO)}
            style={{ cursor: "pointer", fontWeight: "bold", }}
          >
            <img
              src={process.env.PUBLIC_URL + "/home.png"}
              alt="홈 이미지"
              style={{ width: "1.75rem", margin: "0 0.5rem" }}
            />
            <span>피움 teacher's</span>
          </div>
          <button
            style={{ fontSize: "1.125rem", margin: "0 0.5rem", fontWeight: "bold", }}
            type="button"
            onClick={() => {
              window.localStorage.removeItem("token");
              setUser({
                author: AUTHOR.ANONYMOUS,
                user_id: -1,
                school_id: -1,
              })
              nav(LINK.INTRO)
            }}
          >
            Logout
          </button>
        </section>
        <section style={{ display: "flex", justifyContent: "space-between" }} css={manageHeaderBottomStyle}>
          <ManageHeaderBtn img_url="/student.png" alt="학생 관리 이미지" text="학생 관리" url="student" />
          <ManageHeaderBtn img_url="/scenario.png" alt="시나리오 관리 이미지" text="시나리오 관리" url="scenario" />
          <ManageHeaderBtn img_url="/stat.png" alt="통계 이미지" text="통계" url="stats" />
        </section>
      </header>
    </>
  );
};

const ManageHeaderBtn = (props) => {
  const nav = useNavigate();

  return (
    <>
      <div
        css={manageHeaderBtnStyle(props.url === window.location.pathname.split('/')[2])}
        onClick={() => nav(LINK.MANAGE + '/' + props.url)}
      >
        <img src={process.env.PUBLIC_URL + props.img_url} alt={props.alt} css={manageHeaderImgSize}/>
        <div style={{ height: "2rem", lineHeight: "2rem", fontWeight: "bold", }}>{props.text}</div>
      </div>
    </>
  );
}
