import { useEffect, useState } from 'react';
import gameService from '../../services/client/game.service';
import { Select, Table, Tag } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './sudokuRanking.scss'


function SudokuRanking() {
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const response = await gameService.getAllRanking();
      setUsersData(response);
    } catch (error) {
      console.error('ERROR OCCURED:', error);
    }
  }

  useEffect(() => {
    getUsers();
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
      title: 'Game Mode',
      dataIndex: 'gameMode',
      key: 'gameMode',
      render: (text, record) => {
        let content;
        switch (record.gameMode) {
          case 'Easy':
            content = (<Tag color='green'>{text}</Tag>);
            break;
          case 'Medium':
            content = (<Tag color='yellow'>{text}</Tag>);
            break;
          case 'Hard':
            content = (<Tag color='red'>{text}</Tag>);
            break;
          default:
            break;
        }
        return content;
      },
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

  const handleChange = async (value) => {
    navigate(`/ranking?gameMode=${value}`);
    const response = await gameService.getAllRanking({
      params: {
        gameMode: value,
      },
    });
    setUsersData(response);
  };

  return (
    <>
      <div className='ranking-wrapper'>
        <div className='select-wrapper'>
          <span className='select-wrapper__text'>Filtering by</span>
          <Select
            defaultValue="All"
            className='select-wrapper__tag'
            onChange={handleChange}
            options={[
              {
                value: 'Easy',
                label: 'Easy mode',
              },
              {
                value: 'Medium',
                label: 'Medium mode',
              },
              {
                value: 'Hard',
                label: 'Hard mode',
              },
            ]}
          />
        </div>
        <Table 
          dataSource={usersData} 
          columns={columns}
          className='ranking-wrapper__table'
          rowKey={record => record._id.$oid}
        />
      </div>
    </>
  )
}

export default SudokuRanking;
