/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";

import {
  displayFlexStyle,
  studyMainBackgroundBottomStyle,
  studyMainBackgroundStyle,
  studyMainBackgroundTopLeftStyle,
  studyMainBackgroundTopRightStyle,
  studyMainCategoryBtnStyle,
  studyMainCategoryDropdownBtnStyle,
  studyMainCategoryDropdownLiStyle,
  studyMainCategoryDropdownStyle,
  studyMainPaginationLiStyle,
  studyMainPaginationStyle,
  studyMainScenarioListStyle,
  studyMainSubSectionStyle,
  studyMainSubTitleStyle,
} from "pages/StudyPage/style";

import { CATEGORY, categoryList } from "utils/constants";
import { Scenario } from "pages/StudyPage/Scenario";

export const TrialPage = () => {
  const [isDropdownView, setIsDropwdwonView] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(CATEGORY.TOTAL);
  const [totalScenario, setTotalScenario] = useState([])
  const [scenario, setScenario] = useState([]);
  const [viewScenario, setViewScenario] = useState([]);

  // 시나리오 요청 api 추가해야 할 위치
  useEffect(() => {
    fetch('https://pium.site/api/scenario/', {
      credentials: 'include',
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    }).then((res) => {
      return res.json()
    }).then((data) => {
      setTotalScenario(data)
    })
  }, [])

  // 카테고리가 변경되면 보여지는 시나리오 리스트 변경
  useEffect(() => {
    if (category === 0) {
      setScenario(totalScenario)
    } else {
      setScenario(totalScenario.filter((s) => s.scen_cate === category))
    }
  }, [category, totalScenario])

  useEffect(() => {
    setViewScenario(scenario.slice((page - 1) * 3, page * 3));
  }, [page, scenario]);

  const Scenarios = viewScenario.map((scenario) => (
    <Scenario key={scenario.scenario_id} scenario={scenario} />
  ));

  return (
    <>
      <main>
        <div css={studyMainBackgroundStyle}>
          <div style={{ display: "flex" }}>
            <div css={studyMainBackgroundTopLeftStyle}></div>
            <div css={studyMainBackgroundTopRightStyle}></div>
          </div>
          <div css={studyMainBackgroundBottomStyle}></div>
        </div>
        <section css={studyMainSubSectionStyle}>
          <h1 css={studyMainSubTitleStyle}>상황을 선택해주세요</h1>
          <div>
            <button
              type="button"
              css={studyMainCategoryDropdownBtnStyle}
              onClick={() => setIsDropwdwonView(!isDropdownView)}
            >
              <div css={displayFlexStyle}>
                <span style={{ marginRight: "1.5rem" }}>
                  {categoryList[category]}
                </span>
                <img
                  src={process.env.PUBLIC_URL + "/arrow-bottom-2.png"}
                  alt="아래 화살표 이미지"
                  style={{ width: "1.25rem" }}
                />
              </div>
            </button>
            {isDropdownView && (
              <ul css={studyMainCategoryDropdownStyle}>
                {categoryList.map((item, idx) => (
                  <CategoryDropdownLi
                    key={idx}
                    category={category}
                    setCategory={setCategory}
                    view={isDropdownView}
                    setView={setIsDropwdwonView}
                    item={item}
                  />
                ))}
              </ul>
            )}
            <button
              type="button"
              css={studyMainCategoryBtnStyle}
              onClick={() => {
                setCategory(CATEGORY.TOTAL);
              }}
            >
              전체보기
            </button>
          </div>
        </section>
        <section css={studyMainScenarioListStyle}>{Scenarios}</section>
        <ul css={studyMainPaginationStyle}>
          {Array(parseInt(scenario.length / 3) + 1)
            .fill(0)
            .map((_, i) => (
              <PaginationLi
                key={i}
                style={{ display: "inline-block", padding: "0 0.5rem" }}
                item={i + 1}
                page={page}
                setPage={setPage}
              />
            ))}
        </ul>
      </main>
    </>
  );
};

const CategoryDropdownLi = (props) => {
  return (
    <>
      <li
        css={studyMainCategoryDropdownLiStyle}
        onClick={() => {
          props.setCategory(categoryList.indexOf(props.item));
          props.setView(!props.view);
        }}
      >
        {props.item}
      </li>
    </>
  );
};

const PaginationLi = (props) => {
  return (
    <>
      <li
        css={studyMainPaginationLiStyle(props.page, props.item)}
        onClick={() => props.setPage(props.item)}
      >
        {props.item}
      </li>
    </>
  );
};