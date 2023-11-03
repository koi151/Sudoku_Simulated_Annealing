import { useEffect, useState } from 'react';
import gameService from '../../services/client/game.service';
import './sudokuRanking.scss'
import { Table } from 'antd';
import moment from 'moment';


function SudokuRanking() {
  const [usersData, setUsersData] = useState([]);

  const getUsers = async () => {
    try {
      const response = await gameService.getAllRanking();
      const sortedData = response.sort((a, b) => a.createdAt - b.createdAt);
      setUsersData(sortedData);
    } catch (error) {
      console.error('ERROR OCCURED:', error);
    }
  }

  useEffect(() => {
    getUsers();
    console.log('usersData:', usersData)
  }, []);

  const formatTimeSolved = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Time Solved',
      dataIndex: 'timeSolved',
      key: 'timeSolved',
      render: (text, record) => {
        return <span>{formatTimeSolved(text)}</span>;
      },
    },
    {
      title: 'Solved At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => {
        const createdAt = moment(text).format('DD-MM-YYYY HH:mm');
        return <span>{createdAt}</span>;
      },
    },
  ];

  return (
    <div className='ranking-wrapper'>
      <Table 
        dataSource={usersData} 
        columns={columns}
        className='ranking-wrapper__table'
        rowKey={record => record._id.$oid}
      />
    </div>
  )
}

export default SudokuRanking;
