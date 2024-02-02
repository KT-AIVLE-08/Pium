/** @jsxImportSource @emotion/react */

import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { 
  backgroundWrapper,
  categoryBtnStyle,
  completeBtnStyle,
  mainTitleBtnWrapper,
  mainTitleStyle,
  publicBtnImgStyle,
  publicBtnStyle,
  publicBtnTextStyle,
  publicDropdownLiStyle,
  publicDropdownUlStyle,
  scenarioTitleStyle,
  placeholderStyle,
  categoryDropdownUlStyle,
  categoryDropdownLiStyle,
  representImgLabelStyle,
  scenarioDescribeStyle,
  addQstBtnStyle,
  levelBtnStyle,
  levelDropdownUlStyle,
  questionStyle,
  questionInputStyle,
  questionDeleteBtnStyle,
  questionImgLabelStyle,
} from "./style";

import { ManageSideBar } from "common/ManageLayout/SideBar";

import { COLORS } from "styles/colors";
import { LEVEL, categoryList } from "utils/constants";
import { userState } from "store/userState";

export const UpdateScenarioPage = () => {
  const nav = useNavigate()

  const user = useRecoilValue(userState)

  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState(0);
  const [level, setLevel] = useState(0);
  const [questionCount, setQuestionCount] = useState([true])
  const [questions, setQuestions] = useState([])

  const visibleDropdownRef = useRef();
  const representImgRef = useRef();
  const categoryDropdownRef = useRef();
  const levelDropdownRef = useRef();
  const titleRef = useRef();
  const describeRef = useRef();
  const questionRef = useRef();

  useEffect(() => {
    const pathnames = window.location.pathname.split("/")
    const scenario_id = pathnames[pathnames.length - 1]
    
    // 실제 요청
    fetch(`https://pium.site/api/scenarioqst/${scenario_id}`, {
      credentials: "include",
      method: "get",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        // 응답 에러 처리
      }
    }).then((data) => {
      setQuestions(data.qst);
      setVisible(data.scenario.visible === 'Y' ? true : false);
      setCategory(data.scenario.scen_cate);
      setLevel(data.scenario.level);
      titleRef.current.value = data.scenario.title;
      describeRef.current.value = data.scenario.describe;
      representImgRef.current.src = process.env.PUBLIC_URL + '/' + data.scenario.scen_image_url;
    })
  }, [])

  const clickPublicBtn = () => {
    const display = visibleDropdownRef.current.style.display
    if (display === "none") visibleDropdownRef.current.style.display = "block";
    else visibleDropdownRef.current.style.display = "none";
  }

  const clickCompleteBtn = () => {
    const questList = questionRef.current.children
    const representImg = representImgRef.current.src.split('/')
    const pathname = window.location.pathname.split('/')
    const scenario_id = parseInt(pathname[pathname.length - 1])
    
    // 입력되지 않은 칸이 존재하면 해당 칸에 입력이 필요하다는 예외 처리가 필요함
    const scenario = {
      scenario_id: scenario_id,
      user_id: user.user_id,
      visible: true ? "Y" : "N",
      scen_image_url: representImg[representImg.length - 1],
      scen_cate: category,
      level: level,
      title: titleRef.current.value,
      describe: describeRef.current.value,
      use_yn: visible ? "Y" : "N",
    }
    const qst = []

    for (let i = 0; i < questList.length; i++) {
      const texts = questList[i].children[0].children
      const answer = questions[i].answer
      let image_url = questList[i].children[1].children[1].children[0].src.split('/')
      image_url = image_url[image_url.length - 1]
      
      const question = {
        qst_id: questions[i].qst_id,
        image_url: image_url,
        qst_text_detail: texts[0].value,
        order_num: i + 1,
        use_yn: questions[i].use_yn,
        scenario: questions[i].scenario,
        answer: [
          {qst_answ_detail: texts[1].value, qst_type: "s", qst: answer[0].qst, qst_answ_id: answer[0].qst_answ_id},
          {qst_answ_detail: texts[2].value, qst_type: "m", qst: answer[1].qst, qst_answ_id: answer[1].qst_answ_id},
          {qst_answ_detail: texts[3].value, qst_type: "m", qst: answer[2].qst, qst_answ_id: answer[2].qst_answ_id},
          {qst_answ_detail: texts[4].value, qst_type: "m", qst: answer[3].qst, qst_answ_id: answer[3].qst_answ_id},
        ]
      }

      qst.push(question)
    }

    const data = {scenario, qst}

    console.log(data);
    fetch(`https://pium.site/api/scenarioqst/${scenario_id}/`, {
      credentials: "include",
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      nav(-1)
    })
  }

  const clickCategoryBtn = () => {
    const display = categoryDropdownRef.current.style.display
    if (display === "none") categoryDropdownRef.current.style.display = "block";
    else categoryDropdownRef.current.style.display = "none"
  }

  const clickLevelBtn = () => {
    const display = levelDropdownRef.current.style.display
    if (display === "none") levelDropdownRef.current.style.display = "block";
    else levelDropdownRef.current.style.display = "none";
  }

  return (
    <>
      <div style={{ display: "flex", backgroundColor: `${COLORS.SUBBACKGROUND}` }}>
        <ManageSideBar />
        <main style={{ width: "calc(100vw - 28rem)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 css={mainTitleStyle}>시나리오 만들기</h2>
            <div css={mainTitleBtnWrapper}>
              {/* 공개 여부 드롭다운 */}
              <ul css={publicDropdownUlStyle} ref={visibleDropdownRef}>
                <li css={publicDropdownLiStyle} onClick={() => {
                  setVisible(true);
                  visibleDropdownRef.current.style.display = "none";
                }}>공개</li>
                <li css={publicDropdownLiStyle} onClick={() => {
                  setVisible(false);
                  visibleDropdownRef.current.style.display = "none";
                }}>비공개</li>
              </ul>
              {/* 공개 여부 설정 버튼 */}
              <button type="button" css={publicBtnStyle} onClick={() => clickPublicBtn()}>
                <div css={publicBtnTextStyle}>{visible ? "공개" : "비공개"}</div>
                <img
                  src={process.env.PUBLIC_URL + "/arrow-bottom-2.png"}
                  alt="공개 여부 드롭다운 메뉴 버튼 이미지"
                  css={publicBtnImgStyle}
                />
              </button>
              {/* 수정 완료 버튼 */}
              <button type="button" css={completeBtnStyle} onClick={() => clickCompleteBtn()}>수정 완료</button>
            </div>
          </div>
          <section style={{ fontSize: "1.063rem", marginLeft: "1.25rem", height: "38rem", overflowY: "scroll" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "40%" }}>
                {/* 대표 이미지 Input */}
                <label
                  htmlFor="represent-img"
                  css={[representImgLabelStyle, backgroundWrapper]}
                >
                  대표 이미지를 추가하세요.
                  {/* 대표 이미지 미리보기(default: default-img.png) */}
                  <img
                    src={process.env.PUBLIC_URL + "/default-img.png"}
                    alt="기본 이미지"
                    style={{ display: "block", margin: "0 auto", paddingTop: "2rem", height: "9.375rem" }}
                    ref={representImgRef}
                  />
                </label>
                <input type="file" accept="image/*" id="represent-img" style={{ display: "none" }}
                  onChange={(e) => {
                    representImgRef.current.src = process.env.PUBLIC_URL + '/' + e.target.value.split('\\')[2];
                  }}
                />
              </div>
              <div style={{ width: "60%" }}>
                <div style={{ width: "100%", display: "flex", position: "relative" }}>
                  {/* 카테고리 선택 버튼 */}
                  <button type="button" css={[categoryBtnStyle, backgroundWrapper]} onClick={() => clickCategoryBtn()}>
                    <div style={{ display: "inline-block" }}>
                      {category === 0 ? "카테고리 선택" : categoryList[category]}
                    </div>
                    <img
                      src={process.env.PUBLIC_URL + "/arrow-bottom-2.png"}
                      alt="카테고리 드롭다운 메뉴 버튼 이미지"
                      css={publicBtnImgStyle}
                      style={{ paddingTop: "0.5rem" }}
                    />
                  </button>
                  {/* 카테고리 선택 드롭다운 */}
                  <ul css={categoryDropdownUlStyle} ref={categoryDropdownRef}>
                    {categoryList.slice(1).map((c, i) => {
                      return <li key={i} css={categoryDropdownLiStyle} onClick={() => {
                        setCategory(i + 1);
                        categoryDropdownRef.current.style.display = "none";
                      }}>{c}</li>;
                    })}
                  </ul>
                  {/* 난이도 선택 버튼 */}
                  <button type="button" css={[levelBtnStyle, backgroundWrapper]} onClick={() => clickLevelBtn()}>
                    <div style={{ display: "inline-block" }}>
                      {level === 0 ? "난이도를 선택하세요." : LEVEL[level]}
                    </div>
                    <img
                      src={process.env.PUBLIC_URL + "/arrow-bottom-2.png"}
                      alt="레벨 드롭다운 메뉴 버튼 이미지"
                      css={publicBtnImgStyle}
                      style={{ paddingTop: "0.5rem" }}
                    />
                  </button>
                  {/* 난이도 선택 드롭다운 */}
                  <ul css={levelDropdownUlStyle} ref={levelDropdownRef}>
                    {Object.keys(LEVEL).map((l, i) => {
                      return <li key={i} css={categoryDropdownLiStyle} onClick={() => {
                        setLevel(i + 1);
                        levelDropdownRef.current.style.display = "none";
                      }}>{LEVEL[l]}</li>;
                    })}
                  </ul>
                </div>
                {/* 시나리오 제목 Input */}
                <input
                  css={[scenarioTitleStyle, backgroundWrapper, placeholderStyle]}
                  placeholder="시나리오 제목을 입력하세요."
                  maxLength={20}
                  ref={titleRef}
                />
                {/* 시나리오 설명 Input */}
                <input
                  type="text"
                  css={[scenarioDescribeStyle, backgroundWrapper, placeholderStyle]}
                  placeholder="시나리오 설명"
                  maxLength={40}
                  ref={describeRef}
                />
              </div>
            </div>
            {/* 질문 */}
            <section style={{ width: "100%" }} ref={questionRef}>
              {questions.length > 0 && questions.map((question, i) => <Question key={i} question={question} />)}
            </section>
          </section>
          {/* 질문 추가 버튼 */}
          <button
            type="button"
            css={addQstBtnStyle}
            onClick={() => {
              setQuestions([...questions, undefined])
            }}
          >
            + 질문 추가하기
          </button>
        </main>
      </div>
    </>
  );
};

const Question = (props) => {
  const question = props.question

  return (
    <div css={[questionStyle, backgroundWrapper]}>
      <div style={{ width: "60%" }}>
        <input type="text" css={[questionInputStyle, placeholderStyle]} placeholder="질문"
          defaultValue={question && question.qst_text_detail}
        />
        <input type="text" css={[questionInputStyle, placeholderStyle]} placeholder="모범 답안"
          defaultValue={question && question.answer[0].qst_answ_detail}
        />
        <input type="text" css={[questionInputStyle, placeholderStyle]} placeholder="객관식 1번"
          defaultValue={question && question.answer[1].qst_answ_detail}
        />
        <input type="text" css={[questionInputStyle, placeholderStyle]} placeholder="객관식 2번"
          defaultValue={question && question.answer[2].qst_answ_detail}
        />
        <input type="text" css={[questionInputStyle, placeholderStyle]} placeholder="객관식 3번"
          defaultValue={question && question.answer[3].qst_answ_detail}
        />
      </div>
      <div style={{ width: "40%", float: "right" }}>
        <button type="button" css={questionDeleteBtnStyle}>
          <img src={process.env.PUBLIC_URL + "/delete.png"} alt="문항 삭제 이미지" />
        </button>
        <label htmlFor="question-img" css={questionImgLabelStyle}>
          <img
            src={question ? process.env.PUBLIC_URL + '/' + question.image_url
              : process.env.PUBLIC_URL + "/default-img.png"}
            style={{ display: "block", margin: "0 auto", paddingTop: "1.8rem", height: "9.125rem" }}
          />
        </label>
        <input type="file" accept="image/*" id="question-img" style={{ display: "none" }}
          onChange={(e) => {
            e.target.previousElementSibling.children[0].src = process.env.PUBLIC_URL + '/' + e.target.value.split('\\')[2];
          }}
        />
      </div>
    </div>
  );
};