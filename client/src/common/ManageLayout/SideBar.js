/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { sideBarItemStyle, sideBarStyle } from "./SideBar.styles";
import { LINK } from "utils/constants";
import { userState } from "store/userState";

export const ManageSideBar = (props) => {
  return (
    <>
      <section css={sideBarStyle}>
        {props.context && props.context.map((c, i) => <SideBarItem key={i} text={c.text} link={c.link} />)}
      </section>
    </>
  );
}

const SideBarItem = (props) => {
  let pathname = window.location.pathname.split('/');

  const nav = useNavigate();
  const user = useRecoilValue(userState);
  
  if (pathname.length == 3) pathname = "/"
  else if (pathname.length == 4) pathname = "/post"
  else pathname = "/" + pathname[3]
  
  return (
    <>
      <div
        css={sideBarItemStyle(props.link === pathname)}
        onClick={() => {
          if (props.link === "/user") {
            nav(LINK.MANAGE + LINK.SCENARIO + props.link + `/${user.user_id}`)
          } else if (props.link === "/school") {
            nav(LINK.MANAGE + LINK.SCENARIO + props.link + `/${user.school_id}`)
          } else if (props.link === "/") {
            nav(LINK.MANAGE + LINK.SCENARIO + props.link)
          } else {
            console.log(pathname);
            nav(LINK.MANAGE + LINK.SCENARIO + LINK.POST)
          }
        }}
      >
        {props.text}
      </div>
    </>
  );
}