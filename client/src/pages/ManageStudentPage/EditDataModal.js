import React from 'react';
import Modal from 'react-modal';

const EditDataModal = ({ isOpen, onClose, onSave, editedData, handleInputChange }) => {
  const modalStyle = {
    content: {
      width: '300px',
      height: '420px',
      margin: 'auto',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Modal"
      style={modalStyle}
    >
    <div>
        <p style = {{textAlign : 'center', fontSize : "20px", fontWeight : "bold"}}> 수정 </p>

      <div style = {{marginTop : "1.4vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>이름</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.username || ''}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
      </div>
      <div style = {{marginTop : "1vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>학년</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.grade || ''}
            onChange={(e) => handleInputChange('grade', e.target.value)}
          />
      </div>
      <div style = {{marginTop : "1vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>반</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.class_field || ''}
            onChange={(e) => handleInputChange('class_field', e.target.value)}
          />
      </div>
      <div style = {{marginTop : "1vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>번호</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.clas_num || ''}
            onChange={(e) => handleInputChange('clas_num', e.target.value)}
          />
      </div>
      <div style = {{marginTop : "1vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>전화번호</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.phone_num || ''}
            onChange={(e) => handleInputChange('phone_num', e.target.value)}
          />
      </div>
      <div style = {{marginTop : "1vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>부모님 전화번호</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.p_phone_num || ''}
            onChange={(e) => handleInputChange('p_phone_num', e.target.value)}
          />
      </div>
      <div style = {{marginTop : "1vh"}}>
        <p style = {{textAlign : 'left',paddingBottom : '0.5vh', fontWeight : 'bold'}}>특이사항</p> 
          <input style = {{width : '100%'}}
            type="text"
            value={editedData.etc || ''}
            maxLength={20}
            onChange={(e) => handleInputChange('etc', e.target.value)}
          />
      </div>
      <div style = {{display : 'flex', justifyContent : 'center', alignItems:'center', paddingTop : '20px'}}>
        <button onClick={onSave} style = {{padding : '0.3vw'}}>Save</button>
        <span>|</span>
        <button onClick={onClose} style = {{padding : '0.3vw'}}>Cancel</button>
      </div>
    </div>
    </Modal>
  );
};

export default EditDataModal;