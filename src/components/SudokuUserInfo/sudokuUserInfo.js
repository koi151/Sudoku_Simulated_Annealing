import React, { useState } from 'react';
import { Input, Modal, Tooltip, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../redux/reduxSlices/sudokuSlice';
import { AiOutlineUserAdd } from 'react-icons/ai';

import './sudokuUserInfo.scss'
import { notification } from 'antd';

function SudokuUserInfo () {
  
  window.onload = function() {
    notification.open({
      message: 'Tip:',
      description: 'Add username to enable ranking feature.',
      duration: 2.5,
      style: { width: 330 },
    });
  };

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const userName = useSelector((state) => state.sudoku.userName);


  const success = () => {
    messageApi.open({
      type: 'success',
      content: `Hello ${userName}`,
      duration: 2,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setUserName(userName);
    success();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInfoChange = (e) => {
    dispatch(setUserName(e.target.value));
  }

  return (
    <>
      {contextHolder}
      <Tooltip title='Input user name for ranking' placement="right" color='#e3cd8371'>
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
          placeholder='Enter user name...'
        />
      </Modal>
    </>
  );
};
export default SudokuUserInfo;