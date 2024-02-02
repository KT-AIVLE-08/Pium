/** @jsxImportSource @emotion/react */

// import { Route } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import{mainBackground, subTextStyle, searchBackground, searchDivStyle, searchTextStyle, searchInputStyle, searchBtnStyle,
       resultBack, resultTextStyle, colLong, colShort, thStyle, tdStyle, tableStyle, tableBackground, detailBtnStyle,
       theadyBackground, tbodyBackground, resultThStyleLong, resultTdStyleLong, resultThStyleShort, resultTdStyleShort} from './style';

import React from 'react';
import StatsDetailModal from './detailModal';

export const StatsPage = () => {
  const [grade, setGrade] = useState('');
  const [classroom, setClassroom] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContainerRef = useRef(null);
  const [student, setStudent] = useState([]);

  const [retrieveData, setRetrieveData] = useState([]);
  const [retrieveDetailData, setRetrieveDetailData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [maxQstCount, setMaxQstCount] = useState(null);

  useEffect(() => {
    if (isModalOpen && modalContainerRef.current) {
      const modalPosition = modalContainerRef.current.offsetTop;
      window.scrollTo({ top: modalPosition, behavior: 'instant' });
    }
  }, [isModalOpen]);

  const handleSearchClick = () => {
    const retrieveStudentData = {
        grade: Number(grade),
        class_field : Number(classroom),
        clas_num : Number(studentNumber),
        username: studentName,
      };
    
    fetch("https://pium.site/api/stats/retrieve/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem("token"),
        },
        body : JSON.stringify(retrieveStudentData)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        setRetrieveData(data);
      })
      .catch((error) => {
        console.error('오류 발생', error.message)
        window.alert('학생 정보가 없습니다')
      });

      setStudent(retrieveStudentData);
  };


  const handleShowDetail = (cate_name, title, qst_count) => {
    const detailScenario = retrieveData.find((result) => result.cate_name === cate_name
                                                           && result.title === title
                                                           && result.qst_count === qst_count)
    
    setSelectedTitle(title);
    setMaxQstCount(qst_count)

    const detailJsonData = {
      'scenario_id' : detailScenario.scenario_id,
      'user_id' : detailScenario.user_id,
    }
    fetch("https://pium.site/api/stats/retrieve/detail/", {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token"),
          },
          body : JSON.stringify(detailJsonData)
        }).then((res) => {
          return res.json();
        }).then((data) => {
          setRetrieveDetailData(data);
          setIsModalOpen(true);
        })
        .catch((error) => {
          console.error('오류 발생', error.message)
          window.alert('오류가 발생했습니다.')
        });
    };

  return (
    <> 
      <main css = {mainBackground}>
          <div>
          <div css ={subTextStyle}>학생 통계</div>
            <div css = {searchBackground}>
              <div css = {searchDivStyle}>
                <p css = {searchTextStyle} >학년</p>
                <input css = {searchInputStyle} type = "text" value = {grade} onChange={(e) => setGrade(e.target.value)} ></input>
              </div>
              <div css = {searchDivStyle}>
                <p css = {searchTextStyle} >반</p>
                <input css = {searchInputStyle} type = "text" value = {classroom} onChange={(e) => setClassroom(e.target.value)} ></input>
              </div>
              <div css = {searchDivStyle}>
                <p css = {searchTextStyle} >번호</p>
                <input css = {searchInputStyle} type = "text" value = {studentNumber} onChange={(e) => setStudentNumber(e.target.value)} ></input>
              </div>
              <div css = {searchDivStyle}>
                <p css = {searchTextStyle}>이름</p>
                <input css = {searchInputStyle} type = "text" value = {studentName} onChange={(e) => setStudentName(e.target.value)} ></input>
              </div>
              <div css = {searchDivStyle}>
                <p> </p>
                <button css = {searchBtnStyle} onClick={handleSearchClick}>검색</button>
              </div>
            </div>
              <div css = {resultBack}>
              <div css = {resultTextStyle} >수행한 시나리오</div>
                <div css = {tableBackground}>
                  
                <div>
                  <div css = {theadyBackground}>
                  <table css = {tableStyle}>
                    <colgroup>
                      <col css ={colLong}/>
                      <col css ={colLong}/>
                      <col css ={colLong}/>
                      <col css ={colLong}/>
                      <col css ={colShort}/>
                    </colgroup>
                        <thead>
                          <tr>
                            <th css = {resultThStyleLong} >카테고리</th>
                            <th css = {resultThStyleLong} >시나리오명</th>
                            <th css = {resultThStyleShort} >문항수</th>
                            <th css = {resultThStyleShort} >자세히 보기</th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                    <div css = {tbodyBackground}>
                      <table css = {tableStyle}>
                        <colgroup>
                            <col css ={colLong}/>
                            <col css ={colLong}/>
                            <col css ={colLong}/>
                            <col css ={colLong}/>
                            <col css ={colShort}/>
                        </colgroup>
                        <tbody>
                          {retrieveData.map((result, index) => (
                              <tr key={index}>
                                <td css={resultTdStyleLong}>{result.cate_name}</td>
                                <td css={resultTdStyleLong}>{result.title}</td>
                                <td css={resultTdStyleShort}>{result.qst_count}</td>
                                <td css={resultTdStyleShort}>
                                    <button css = {detailBtnStyle} onClick={() => handleShowDetail(result.cate_name, result.title, result.qst_count)}>click</button>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </main>
        <div ref={modalContainerRef} >{isModalOpen && <StatsDetailModal onClose={() => setIsModalOpen(false)} sdata = {retrieveDetailData} title = {selectedTitle} student = {student} max_count = {maxQstCount} /> }</div>
    </>
  );
};