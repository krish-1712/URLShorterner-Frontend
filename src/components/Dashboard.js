import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
  let token = sessionStorage.getItem('token')

  console.log('Token:', token);

  const [urlCountsByDay, setUrlCountsByDay] = useState([]);
  const [urlCountsByMonth, setUrlCountsByMonth] = useState([]);
  let navigate = useNavigate();
  
  useEffect(() => {
    const fetchURLCounts = async () => {
      try {
        if (!token) {
          toast.error("Session Expired. Please Login Again.");
          sessionStorage.clear();
          navigate('/login');
        } else {
          const response = await axios.get(`${url}/users/1/urlcounts`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUrlCountsByDay(response.data.urlCountsByDay);
          setUrlCountsByMonth(response.data.urlCountsByMonth);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching URL counts:', error);
        toast.error(error.response.data.message);
        navigate('/login');
      }
    };

    fetchURLCounts();
  }, [navigate, token]);

  const handleURLShortenerClick = () => {
    navigate('/shorten');
  };

  return (
    <div>
      <Typography variant="h6" component="h2" className='counts'>
        URL Counts Per Day
      </Typography>
      <TableContainer component={Paper}>
        <Table striped bordered hover>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Shortened URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urlCountsByDay.map((data, index) => (
              <TableRow key={index + 1}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.count}</TableCell>
                <TableCell>{data.originalURL}</TableCell>
                <TableCell>{data.shortenedURL}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" component="h2" className='counts'>
        URL Counts Per Month
      </Typography>
      <TableContainer component={Paper}>
        <Table striped bordered hover>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Shortened URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urlCountsByMonth.map((data, index) => (
              <TableRow key={index + 1}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.count}</TableCell>
                <TableCell>{data.originalURL}</TableCell>
                <TableCell>{data.shortenedURL}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" id='click' onClick={handleURLShortenerClick}>
        Create Short URL
      </Button>
    </div>
  );
};

export default Dashboard;
