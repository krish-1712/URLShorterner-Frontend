import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



const Dashboard = () => {
  let token = sessionStorage.getItem('token')
  
  console.log('Token:', token);

  const [urlCountsByDay, setUrlCountsByDay] = useState([]);
  const [urlCountsByMonth, setUrlCountsByMonth] = useState([]);
  let navigate = useNavigate()
  useEffect(() => {
    const fetchURLCounts = async () => {
      try {
        if (!token) {
          toast.error("session Expired Login Again")
          sessionStorage.clear()
          navigate('/login')

        } else {
          const response = await axios.get(`${url}/users/1/urlcounts`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUrlCountsByDay(response.data.urlCountsByDay);
          setUrlCountsByMonth(response.data.urlCountsByMonth);
          toast.success(response.data.message)

        }
      }
      catch (error) {
        console.error('Error fetching URL counts:', error);
        toast.error(error.response.data.message)
        navigate('/login');
      }
    };

    fetchURLCounts();
  }, [navigate, token]);


 




  const handleURLShortenerClick = () => {
    navigate('/shorten')
  }

  return (
    <div>



      <h2 className='counts'>URL Counts Per Day</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Count</th>
            <th>Original URL</th>
            <th>Shortern URL</th>
          </tr>
        </thead>
        <tbody>
          {urlCountsByDay.map((data, index) => (
            <tr key={index + 1}>
              <td>{data._id}</td>
              <td>{data.count}</td>
              <td>{data.originalURL}</td>
              <td>{data.shortenedURL}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className='counts'>URL Counts Per Month</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Count</th>
            <th>Original URL</th>
            <th>Shortern URL</th>
          </tr>
        </thead>
        <tbody>
          {urlCountsByMonth.map((data, index) => (
            <tr key={index + 1}>
              <td>{data._id}</td>
              <td>{data.count}</td>
              <td>{data.originalURL}</td>
              <td>{data.shortenedURL}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" id='click' onClick={handleURLShortenerClick}>
        Create Short URL
      </Button>


     

    </div>








  );
};

export default Dashboard;