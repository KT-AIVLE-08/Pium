/** @jsxImportSource @emotion/react */

import{mainBackground, resultTextStyle, thStyle, tdStyle, tableStyle,
  detailColStyle, detailTableBackground, detailResultBack, detailCloseStye,
  detailCloseBtn, detailTheadyBackground, detailColShortStyle, detailColMediumStyle, detailColMostShortStyle,
  detailTitleStyle, dropDownStyle, dropDownResetBtn} from './style';

import { useState, useEffect } from 'react';
import React from 'react';

const StatsDetailModal = ({ onClose, sdata, title, student, max_count}) => {
const [data, setData] = useState(sdata);
const [sortBy, setSortBy] = useState(null);
const [audioUrl, setAudioUrl] = useState(null);
// const [audioUrl, setAudioUrl] = useState('');
const [audio, setAudio] = useState(null); // 질문 음성 파일

const handleSort = (columnName) => {
 const newData = [...data];

 if (sortBy === columnName) {
   newData.reverse();
 } else {
   newData.sort((a, b) => a[columnName] - b[columnName]);
 }

 setData(newData);
 setSortBy(columnName);
};

const handleReset = () => {
 setData([...sdata]);
 setSortBy(null);
};

const handleAudio = (audioUrl) => {
  setAudio(new Audio(audioUrl))
};

useEffect(() => {
  // 오디오 파일이 설정되면 재생
  if (audio) {
    audio.volume = 1;
    setTimeout(() => {
      audio.autoplay = true;
      audio.load();
    }, 300);
  }
}, [audio]);

return (
 <>
   <main css = {mainBackground}>
     <div css = {detailResultBack}>
       <div>
         <div css = {detailTitleStyle}>
           <span css = {resultTextStyle}> 시나리오 [{title}] | {student.grade}학년 {student.class_field}반 {student.clas_num}번 {student.username} </span>
             <span css = {dropDownStyle}>
             <label style = {{marginRight : '0.5vw'}}>정렬 기준:</label>
               <select style = {{fontWeight : 'bold'}}
                 value={sortBy || ''}
                 onChange={(e) => handleSort(e.target.value)}>
                 <option style = {{fontWeight : 'bold'}} value="">선택하세요</option>
                 <option style = {{fontWeight : 'bold'}} value="insert_time">시간순</option>
                 <option style = {{fontWeight : 'bold'}} value="order_num">문항별</option>
             </select><button css = {dropDownResetBtn} onClick={handleReset}> ↻ </button></span>
           </div>
             <div>
               <div css = {detailTheadyBackground}>
                 <table css = {tableStyle}>
                   <colgroup>
                     <col css ={detailColMostShortStyle}/>
                     <col css ={detailColStyle}/>
                     <col css ={detailColStyle}/>
                     <col css ={detailColMostShortStyle}/>
                     <col css ={detailColShortStyle}/>
                     <col css ={detailColMostShortStyle}/>
                     <col css ={detailColMediumStyle}/>
                   </colgroup>
                     <thead>
                       <tr>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd'}}>번호</th>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd'}}>문제</th>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd'}}>학생 답안</th>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd'}}>음성</th>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd'}}>제출 형식</th>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd'}}>재시도</th>
                         <th css = {thStyle} style = {{borderLeft : '1px solid #ddd', borderRight : "1px solid #ddd"}}>제출 시간</th>
                       </tr>
                     </thead>
                 </table>
               </div>

               <div css = {detailTableBackground} >
               <table css = {tableStyle}>
                   <colgroup>
                     <col css ={detailColMostShortStyle}/>
                     <col css ={detailColStyle}/>
                     <col css ={detailColStyle}/>
                     <col css ={detailColMostShortStyle}/>
                     <col css ={detailColShortStyle}/>
                     <col css ={detailColMostShortStyle}/>
                     <col css ={detailColMediumStyle}/>
                     </colgroup>
                       <tbody>
                       {data.map((result, index) => (
                        <React.Fragment key={index}>
                           {sortBy === 'order_num' && index > 0 && result.order_num !== data[index - 1].order_num && (
                           <tr style = {{borderTop : '3px solid grey'}}>
                               </tr>
                           )}
                           {sortBy === 'insert_time' && index > 0 && index < data.length && result.order_num === 1 && result.order_num !== data[index + 1].order_num && (
                                 <tr style = {{borderBottom : '3px solid grey'}} >
                                 </tr>
                               )}
                           <tr key={index}>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd'}}>{result.order_num}</td>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd'}}>{result.qst_text_detail}</td>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd'}}>{result.std_answ_detail}</td>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd'}}>
                              <button onClick={() => {handleAudio(result.answ_voice_url)}}>재생</button></td>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd'}}>{result.std_answ_type}</td>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd'}}>{result.retry_yn}</td>
                             <td css={tdStyle} style = {{borderLeft : '1px solid #ddd', borderRight : "1px solid #ddd"}}>{result.insert_time}</td>
                         </tr>
                         </React.Fragment>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>

             <div css = {detailCloseStye}>
             <button css = {detailCloseBtn} onClick={onClose}>돌아가기</button>
             </div>
         </div>
       </div>
   </main>
 </>
);
};

export default StatsDetailModal;