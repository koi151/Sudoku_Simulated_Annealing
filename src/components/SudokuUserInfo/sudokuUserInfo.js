import React, { useState } from 'react';
import { Card, Form, Input, Modal, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../redux/reduxSlices/sudokuSlice';
import { AiOutlineUserAdd } from 'react-icons/ai';
import './sudokuUserInfo.scss'

function SudokuUserInfo () {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInfoChange = (e) => {
    dispatch(setUserName(e.target.value));
  }

  return (
    <>
      <Tooltip title='Input user name for ranking' placement="right" color='#61bab779'>
        <div className='user-info btn-controllers' onClick={showModal}>
          <AiOutlineUserAdd />
        </div>
      </Tooltip>
      <Modal 
        title="Player info" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <Input 
          onChange={handleInfoChange}
          className='info-input'
          placeholder='Enter you user name.'
        />
      </Modal>
    </>
  );
};
export default SudokuUserInfo;