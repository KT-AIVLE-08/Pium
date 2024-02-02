/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";

import {
  scenarioArrowImgStyle,
  scenarioArrowWrapStyle,
  scenarioDescribeStyle,
  scenarioLevelStyle,
  scenarioTitleStyle,
  scenarioWrapperStyle,
} from "./Scenario.styles";

import { LEVEL, LINK } from "utils/constants";

export const Scenario = (props) => {
  const data = props.scenario;
  const nav = useNavigate();

  // 클릭 시 해당 시나리오 학습 화면으로 이동해야함

  return (
    <>
      <div
        css={scenarioWrapperStyle}
        onClick={() => {
          nav(LINK.SCENARIO + `/${data.scenario_id}`);
        }}
      >
        <section>
          <div css={scenarioLevelStyle}>{LEVEL[data.level]}</div>
          <img src={process.env.PUBLIC_URL + data.scen_image_url} alt="시나리오 대표 이미지" style={{width: "27.125rem", height: "18rem", borderRadius: "0.75rem"}} />
        </section>
        <section style={{ margin: "1.563rem 1.25rem", fontWeight: "bold", }}>
          <div css={scenarioTitleStyle}>{data.title}</div>
          <div css={scenarioDescribeStyle}>{data.describe}</div>
        </section>
        <div css={scenarioArrowWrapStyle}>
          <img
            src={process.env.PUBLIC_URL + "/arrow-right.png"}
            alt="오른쪽 화살표 이미지"
            css={scenarioArrowImgStyle}
          />
        </div>
      </div>
    </>
  );
};
