/** @jsxImportSource @emotion/react */

import { useState, useEffect, useRef } from "react";
import{
    main, mainSize, tableSize, subBackgroundStyle,
    colSizeShort, colSizeMedium, colSizeLong, thStyle, tdStyle, tdForModifyStyle,
    studentAddBtnStyle, subTitleStyle, btnImgStyle, StudentModifyBtnStyle, pageStyle,
    colSizeMostShort
} from './style';

import EditDataModal from './EditDataModal';
import AddDataModal from './AddDataModal'
import React from 'react';
import Modal from 'react-modal';

export const ManageStudentPage = () => {
    const [isModalOpen, setModalOpen] = useState(false); 
    const [selectedRow, setSelectedRow] = useState([]); //[username, clas_num]으로 선택된 row 확인하기 위한 변수
    const [editedData, setEditedData] = useState({});   // 수정된 데이터 정보를 저장하기 위한 변수
    const [loginId, setLoginId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [visibleData, setVisibleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const appElementRef = useRef(null);
    Modal.setAppElement(appElementRef.current);

    //학생 데이터 가져오기
    useEffect(() => {
      fetch("https://pium.site/api/students/school", {
        credentials: "include",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem("token"),
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        setTableData(data);
      });
    }, []);

    //모달 오픈
    const openModal = () => {
      setModalOpen(true);
    };
    
    //모달 종료
    const closeModal = () => {
      setModalOpen(false);
    };

    //학생 정보 추가하기
    const handleAddData = (newData) => {
      setTableData([...tableData, newData]);
      closeModal();
    };

    //학생 정보 수정
    const handleEdit = (name, number) => {
      const selectedRowData = tableData.find((row) => row.username === name && row.clas_num === number) || {};

      // 아이디 뽑아오기
      let sch_id = String(selectedRowData.school_id);
      let std_grade = String(selectedRowData.grade);
      let std_class = String(selectedRowData.class_field);
      let std_num = String(selectedRowData.clas_num);

      if(std_class <= 9) {
        std_class = '0' + std_class;
      }

      if(std_num <= 9) {
        std_num = '0' + std_num;
      }

      const requestLoginId = sch_id + std_grade + std_class + std_num;
      setLoginId(requestLoginId);
      setSelectedRow([name, number]);
      setEditedData(selectedRowData);
      setModalIsOpen(true);
    };


    //학생 정보 저장
    const handleSave = async() => {
      const updatedTableData = tableData.map((row) =>
      (row.username === selectedRow[0] && row.clas_num === selectedRow[1])
        ? { ...row, ...editedData }
        : row
      );

      try {
        const response = await fetch('https://pium.site/api/students/update/' + loginId + '/', {
          credentials: "include",
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token"),
          },
          body: JSON.stringify(editedData),
        });

        if (response.ok) {
          console.log('데이터 수정 성공');
          window.alert('데이터 수정에 성공했습니다.');
          setTableData(updatedTableData);
          setSelectedRow(null);
          setLoginId(null);
          setEditedData({});
          setModalIsOpen(false);
        } else {
          console.error('데이터 수정 실패');
          window.alert('데이터 수정에 실패했습니다.');
          
        }
      } catch (error) {
        console.error('API 호출 중 오류:', error);
        window.alert('오류가 발생했습니다.');
      }
    };

    const handleInputChange = (field, value) => {
      setEditedData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDelete = async(name, number) => {
      const updatedTableData = tableData.filter((row) => !(row.username === name && row.clas_num === number)); // 삭제할 학생 제외한 데이터
      const requestDeleteData = tableData.find((row) => row.username === name && row.clas_num === number) || {}; //삭제할 학생 데이터

      // login_id 만들기
      let sch_id = String(requestDeleteData.school_id);
      let std_grade = String(requestDeleteData.grade);
      let std_class = String(requestDeleteData.class_field);
      let std_num = String(requestDeleteData.clas_num);

      if(std_class <= 9) {
        std_class = '0' + std_class;
      }

      if(std_num <= 9) {
        std_num = '0' + std_num;
      }

      const requestLoginId = sch_id + std_grade + std_class + std_num;

      try {
        const response = await fetch('https://pium.site/api/students/delete/' + requestLoginId, {
          credentials: "include",
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token"),
          },
        });

        if (response.status === 204) {
          console.log('데이터 삭제 성공');
          window.alert('학생 정보가 삭제되었습니다.');
          setTableData(updatedTableData);
        } else {
          console.error('데이터 삭제 실패');
          window.alert('학생 정보 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('API 호출 중 오류:', error);
        window.alert('오류가 발생했습니다.');
      }
    };

    // 페이지 이동
    const pageSize = 6;
    
    const totalPages = Math.ceil(tableData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, tableData.length);

    useEffect(() => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, tableData.length);
      setVisibleData(tableData.slice(startIndex, endIndex))
    }, [tableData, currentPage])
    
    return (
        <>
          <main css = {main} ref={appElementRef}>
            <div css = {subTitleStyle} >학생 관리</div>
                <div css ={mainSize}>
                    <div css = {subBackgroundStyle}>
                        <table css = {tableSize}>
                            <colgroup>
                                <col css ={colSizeMostShort}/>
                                <col css ={colSizeShort}/>
                                <col css ={colSizeShort}/>
                                <col css ={colSizeShort}/>
                                <col css ={colSizeShort}/>
                                <col css ={colSizeMedium}/>
                                <col css ={colSizeMedium}/>
                                <col css ={colSizeLong}/>
                                <col css ={colSizeShort}/>
                            </colgroup>
                        <thead>
                            <tr>
                            <th css ={thStyle}>NO.</th>
                            <th css ={thStyle}>이름</th>
                            <th css ={thStyle}>학년</th> 
                            <th css ={thStyle}>반</th> 
                            <th css ={thStyle}>번호</th> 
                            <th css ={thStyle}>전화번호</th>
                            <th css ={thStyle}>부모님 전화번호</th> 
                            <th css ={thStyle}>특이사항</th> 
                            <th css ={thStyle}>수정/삭제</th> 
                            </tr>
                        </thead>

                        <tbody>
                          {visibleData.map((row, index) => (
                            <tr key={startIndex + index}>
                                <td css = {tdStyle}>{startIndex + index + 1}</td>
                                <td css = {tdStyle}>{row.username}</td>
                                <td css = {tdStyle}>{row.grade}</td>
                                <td css = {tdStyle}>{row.class_field}</td>
                                <td css = {tdStyle}>{row.clas_num}</td>
                                <td css = {tdStyle}>{row.phone_num}</td>
                                <td css = {tdStyle}>{row.p_phone_num}</td>
                                <td css = {tdStyle}>{row.etc}</td>
                                <td css = {tdStyle} >
                                    <div>
                                        <button onClick={() => handleEdit(row.username, row.clas_num)}>
                                            <img
                                                src={process.env.PUBLIC_URL + "/action_edit.png"}
                                                css={btnImgStyle}
                                                alt="수정"
                                            />
                                        </button>
                                        <EditDataModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSave={handleSave} editedData={editedData} handleInputChange={handleInputChange}/>
                                        <span> </span>
                                        <button onClick={() => handleDelete(row.username, row.clas_num)}>
                                            <img
                                                src={process.env.PUBLIC_URL + "/action_delete.png"}
                                                css={btnImgStyle}
                                                alt="삭제"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                    
                        </tbody>
                        </table>
                        <div> 
                            <button css={studentAddBtnStyle} onClick={openModal}>학생 추가하기</button>
                            <AddDataModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onRequestClose={closeModal} onAddData={handleAddData}/>
                        </div>

                        <div css = {pageStyle}>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                              {currentPage - 1 !== 0 ? currentPage - 1 : ''}
                            </button>
                            <span> </span><span> {currentPage} </span><span> </span>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                {visibleData.length !== 0 ? currentPage + 1 : ''}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
          </>
    );
};