import { Outlet } from "react-router-dom";

import { IntroHeader } from "./IntroHeader";
import { Footer } from "common/Footer";

export const IntroLayout = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <IntroHeader />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
