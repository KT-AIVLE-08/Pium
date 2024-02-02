import React, { useState } from 'react';
import Modal from 'react-modal';

const AddDataModal = ({ isOpen, onClose, onRequestClose, onAddData}) => {
  const [newData, setNewData] = useState({
    id: "",
    username: '',
    grade: '',
    class_field: '',
    clas_num: '',
    phone_num: '',
    p_phone_num: '',
    etc: '',
  });

  const modalStyle = {
    content: {
      width: '300px',
      height: '420px',
      margin: 'auto',
    },
  };

  const handleInputChange = (e, field) => {
    setNewData({ ...newData, [field]: e.target.value });
  };

  const handleAddData = async () => {
    onAddData(newData);
    try {
      // 서버로 데이터를 보내는 API 호출 (예시: POST 요청)
      const response = await fetch('https://pium.site/api/studentsignup/', {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        console.log('데이터 추가 성공');
        window.alert('학생 정보 생성이 완료되었습니다.');
        setNewData({
          id: "",
          username: '',
          grade: '',
          class_field: '',
          clas_num: '',
          phone_num: '',
          p_phone_num: '',
          etc: '',
        });
        onRequestClose();
      } else {
        console.error('데이터 추가 실패');
        window.alert('학생 정보 생성이 실패하였습니다.');
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      window.alert('오류가 발생했습니다.');
    }

  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle} contentLabel="Add Modal">
      <div>
        <p style = {{textAlign : 'center', fontSize : "20px", fontWeight : "bold"}}> 학생 추가 </p>

        <div style = {{marginTop : "1.4vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>이름</p>
          <input style = {{width : '100%'}} type="text" defaultValue={newData.username} onChange={(e) => handleInputChange(e, 'username')} />
        </div>

        <div style = {{marginTop : "1vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>학년</p>
          <input style = {{width : '100%'}} type="text" defaultValue={newData.grade} onChange={(e) => handleInputChange(e, 'grade')} />
        </div>

        <div style = {{marginTop : "1vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>반</p>
          <input style = {{width : '100%'}} type="text" defaultValue={newData.class_field} onChange={(e) => handleInputChange(e, 'class_field')} />
        </div>

        <div style = {{marginTop : "1vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>번호</p>
          <input style = {{width : '100%'}} type="text" defaultValue={newData.clas_num} onChange={(e) => handleInputChange(e, 'clas_num')} />
        </div>

        <div style = {{marginTop : "1vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>전화번호</p>
          <input style = {{width : '100%'}} type="text" defaultValue={newData.phone_num} onChange={(e) => handleInputChange(e, 'phone_num')} />
        </div>

        <div style = {{marginTop : "1vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>부모님 전화번호</p>
          <input style = {{width : '100%'}} type="text" defaultValue={newData.p_phone_num} onChange={(e) => handleInputChange(e, 'p_phone_num')} />
        </div>

        <div style = {{marginTop : "1vh"}}>
          <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>특이사항</p>
          <input maxLength={20} style = {{width : '100%'}} type="text" defaultValue={newData.etc} onChange={(e) => handleInputChange(e, 'etc')} />
        </div>

        <div style = {{display : 'flex', justifyContent : 'center', alignItems:'center', paddingTop : '20px'}}>
          <button type="button" onClick={handleAddData} style = {{padding : '0.3vw'}}>Add Data</button>
          <span>|</span>
          <button onClick={onClose} style = {{padding : '0.3vw'}}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddDataModal;