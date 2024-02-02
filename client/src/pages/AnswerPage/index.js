/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
import { useRecoilState } from "recoil";
import { Link } from 'react-router-dom';

import {
  main,
  learningSection,
  learningHeading,
} from "./style.js";
import { Box } from "./Box";
import { resultState } from "store/userState.js";

export const AnswerPage = () => {
  const [result, setResult] = useRecoilState(resultState)

  useEffect(() => {
    return () => {setResult([])}
  }, [])

  return (
    <>
      <main css={main}>
        <div css={learningSection}>
          <h3 css={learningHeading}>학습 결과</h3>
          {result.length !== 0 &&
            result.map((d) => <Box question={d.question} answer={d.answer} />)}
        </div>
        <p style = {{textAlign : 'center', padding : '1vh', fontSize : '21px', color : 'black',}}>참 잘했어요. [돌아가기] 버튼을 눌러주세요.</p>
        <div style = {{paddingTop : '1vh', display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
          <Link to="/study">
            <button
              style = {{border : '2px solid #008573', width : '13vw', height : '7vh', borderRadius : '3.25rem',
                        fontSize : '1.5vw', backgroundColor : '#008573', color : 'white', fontWeight : 'bold',
                      }}
            >
              돌아가기
            </button>
          </Link>
         </div>
      </main>
    </>
  );
};