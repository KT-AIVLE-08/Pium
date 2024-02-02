import { Outlet } from "react-router-dom";

import { CommonHeader } from "./CommonHeader";
import { Footer } from "common/Footer";
import { LINK } from "utils/constants";

export const CommonLayout = () => {
  const showFooterCondition = window.location.pathname === LINK.INTRO || window.location.pathname === LINK.ABOUT

  return (
    <>
      <CommonHeader />
      <div style={{ padding: "7rem 0 2rem 0" }}>
        <Outlet />
      </div>
      {showFooterCondition && <Footer />}
    </>
  );
};
