/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  badgeWrapperStyle,
  easyBadgeStyle,
  hardBadgeStyle,
  mainSectionBtnStyle,
  mainSectionContentStyle,
  mainSectionStyle,
  mainTitleStyle,
  normalBadgeStyle,
  paginationStyle,
  tableBodyImgStyle,
  tableBodyStyle,
  tableHeaderStyle,
} from './style';
import { ManageSideBar } from "common/ManageLayout/SideBar";

import { LINK, emptyScenario, manageScenarioSideBarList, manageTableHeaderType } from "utils/constants";
import { COLORS } from "styles/colors";
import { userState } from "store/userState";
import { studyMainPaginationLiStyle } from "pages/StudyPage/style";

export const ManageScenarioPage = (props) => {
  const nav = useNavigate()

  const user = useRecoilValue(userState);

  const [scenarios, setScenarios] = useState([]);
  const [viewScenario, setViewScenario] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    if (user.user_id !== -1) {
      if (props.link === LINK.USER) {
        fetch(`https://pium.site/api/scenario/user/${user.user_id}/`, {
          credentials: "include",
          method: "get",
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
  
          }
        }).then((data) => {
          setScenarios(data);
        })
      } else if (props.link === LINK.SCHOOL) {
        fetch(`https://pium.site/api/scenario/school/${user.school_id}/`, {
          credentials: "include",
          method: "get",
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            nav(LINK.LOGIN)
          }
        }).then((data) => {
          setScenarios(data);
        })
      } else if (props.link === "/") {
        fetch("https://pium.site/api/scenario/", {
          credentials: "include",
          method: "get",
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        }).then((data) => {
          setScenarios(data);
        })
      }
    }
  }, [props.link, user])

  useEffect(() => {
    let view = scenarios.slice((page - 1) * 6, page * 6)

    if (view.length < 6) {
      const len = 6 - parseInt(view.length);
      for (let i = 0; i < len; i++) {
        view.push(emptyScenario)
      }
    }
    
    setViewScenario(view);
  }, [page, scenarios])

  return (
    <>
      <div style={{ display: "flex", backgroundColor: `${COLORS.SUBBACKGROUND}` }}>
        <ManageSideBar context={manageScenarioSideBarList} />
        <main style={{ width: "calc(100vw - 24.5rem)" }}>
          <MainTitle link={props.link} />
          <section css={mainSectionStyle}>
            <div style={{ display: "flex" }}>
              <button css={mainSectionBtnStyle}>
                <span style={{ marginRight: "1.5rem", fontWeight: "bold", }}>등록 순</span>
                <img
                  src={process.env.PUBLIC_URL + "/arrow-bottom.png"}
                  alt="아래 화살표 이미지"
                  style={{ height: "1.125rem" }}
                />
              </button>
            </div>
            <div css={mainSectionContentStyle}>
              <ManageTable
                viewScenes={viewScenario}
                scenarios={scenarios}
                setScenarios={setScenarios}
                link={props.link}
                page={page}
              />
            </div>
            <ul css={paginationStyle}>
              {Array(parseInt(scenarios.length / 6) + 1)
                .fill(0)
                .map((_, i) => 
                  <PaginationLi
                    key={i} 
                    item={i + 1}
                    page={page}
                    setPage={setPage}
                  />
                )
              }
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

const MainTitle = (props) => {
  switch (props.link) {
    case LINK.USER:
      return <h2 css={mainTitleStyle}>내가 만든 시나리오</h2>
    case LINK.SCHOOL:
      return <h2 css={mainTitleStyle}>우리 학교 시나리오</h2>
    case "/":
      return <h2 css={mainTitleStyle}>전체 시나리오</h2>
    default:
      break;
  }
}

const ManageTable = (props) => {
  return (
    <>
      <table style={{ width: "100%", height: "100%", tableLayout: "fixed", fontWeight: "bold", }}>
        <ManageTableHeader link={props.link} />
        <tbody>
          {props.viewScenes.map((scenario, idx) => (
            <ManageTableColumn 
              key={idx}
              idx={idx + 1}
              scenario={scenario}
              link={props.link}
              page={props.page}
              scenarios={props.scenarios}
              setScenarios={props.setScenarios}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const ManageTableColumn = (props) => {
  const nav = useNavigate();

  const scenario = props.scenario;
  const scenarioBody = ["title", "level", "insert_time"];

  return (
    <>
      <tr style={{ height: "2.5rem" }}>
        <td css={tableBodyStyle}>{props.idx}</td>
        {scenarioBody.map((c, i) => {
          if (c === "insert_time") {
            return <td key={i} css={tableBodyStyle}>{scenario[c].slice(0, 10)}</td>;
          } else if (c === "level") {
            return <td key={i} css={tableBodyStyle}><ScenarioLevelBadge level={scenario[c]} /></td>;
          } else {
            return <td key={i} css={tableBodyStyle}>{scenario[c]}</td>;
          }
        })}
        {
          props.link === LINK.USER ?
          <td css={tableBodyStyle}>
            {
              scenario.scenario_id === -1 ? <></> :
              <>
                <img src={process.env.PUBLIC_URL + "/action_use.png"} alt="사용 여부" css={tableBodyImgStyle} />
                <img src={process.env.PUBLIC_URL + "/action_edit.png"} alt="수정" css={tableBodyImgStyle}
                  onClick={() => {
                    nav(LINK.MANAGE + LINK.SCENARIO + LINK.UPDATE + `/${scenario.scenario_id}`)
                  }}
                />
                <img src={process.env.PUBLIC_URL + "/action_delete.png"} alt="삭제" css={tableBodyImgStyle}
                  onClick={() => {
                    fetch(`https://pium.site/api/scenario/${scenario.scenario_id}`, {
                      credentials: 'include',
                      method: 'delete',
                      headers: {'Content-Type': 'application/json'},
                    }).then((res) => {
                      if (res.status === 200) {
                        return res.json();
                      }
                    }).then((data) => {
                      const index = (props.page - 1) * 6 + props.idx - 1;

                      const nextScenarios = props.scenarios;
                      nextScenarios.splice(index, 1);
                      props.setScenarios([...nextScenarios])
                    })
                  }}
                />
              </>
            }
          </td> :
          <td css={tableBodyStyle}>
            {
              scenario.scenario_id === -1 ? <></> :
              <>
                <div>{scenario.school_name}</div>
                <div>{scenario.username} 교사</div>
              </>
            }
          </td>
        }
      </tr>
    </>
  )
}

const ManageTableHeader = (props) => {
  const headerContext = manageTableHeaderType[props.link]

  return (
    <>
      <thead>
        <tr style={{ height: "2.5rem", backgroundColor: COLORS.SUBBACKGROUND }}>
          {headerContext.map((context, i) => <td key={i} css={tableHeaderStyle} style={{width: context.width}}>{context.text}</td>)}
        </tr>
      </thead>
    </>
  );
};

const ScenarioLevelBadge = (props) => {
  switch (props.level) {
    case 1:
      return <div css={[badgeWrapperStyle, easyBadgeStyle]}>Easy</div>
    case 2:
      return <div css={[badgeWrapperStyle, normalBadgeStyle]}>Normal</div>
    case 3:
      return <div css={[badgeWrapperStyle, hardBadgeStyle]}>Hard</div>
    default:
      break;
  }
};

const PaginationLi = (props) => {
  return (
    <>
      <li
        onClick={() => props.setPage(props.item)}
        css={studyMainPaginationLiStyle(props.page, props.item)}
      >
        {props.item}
      </li>
    </>
  )
}