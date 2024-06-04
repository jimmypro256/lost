import { Logout, FeedbackOutlined, ShareRounded, PresentToAll, InfoOutlined, MessageRounded, PersonRemoveAlt1, NoteAdd, RemoveRedEye, Print, Search } from '@mui/icons-material';
import { Box, Stack, Button, Modal, TextField, Skeleton, Breadcrumbs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../App.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Alert, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'react-router-dom';
import AdminSidebar from './adminsidebar';
import { RateReviewTwoTone } from '@material-ui/icons';
import Navbar from './navbar';
import Footer from './footer';
import AdminBar from './adminbar';

function Verify() {
  const [loading, setLoading] = useState(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/replies');
        if (response.ok) {
          const data = await response.json();
          setAccounts(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch accounts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleVerify = (username) => {
    setSelectedUsername(username);
    setIsModalOpen1(true);
  };

  const handleDecision = async () => {
    try {
      const response = await fetch('http://localhost:5000/decision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: selectedUsername,
          message: replyMessage,
        }),
      });
      if (response.ok) {
        setSuccessModalOpen(true);
        setIsModalOpen1(false);
      } else {
        console.error('Failed to send decision:', response.statusText);
        Alert.alert('Failed to send decision');
      }
    } catch (error) {
      console.error('Error sending decision:', error);
      Alert.alert('Error sending decision');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen1(false);
  };



  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
      <AdminBar />
      <Footer />
      <div className='mt-[100px]'>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='m-2' gap="10px">
          <AdminSidebar />
          <Box width={{ xs: '100%', sm: '85%' }} className="border border-slate-400 bg-white" height={{ sm: '75vh' }}>
            <div className='border border-gray-100 bg-slate-50 m-1 mx-2'>
              <p className='text-center font-medium text-[1.4em]'>VERIFY CLAIMER'S FOUND ITEM DESCRIPTION</p>
            </div>
            <Box className='border border-gray-100 overflow-y-auto p-3 bg-gray-100' height='62vh' p={1} m={2}>
              <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Claimer Name</b></TableCell>
                      <TableCell><b>Claimer item Description</b></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account._id}>
                        <TableCell>{account.username}</TableCell>
                        <TableCell>{account.message}</TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => handleVerify(account.username)}>feedback</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Stack>
      </div>

      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'>Sent Successfully!</h2>
          <div className='mt-5 flex justify-center'>
            <p onClick={() => setSuccessModalOpen(false)} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
          </div>
        </div>
      </Modal>

      <Modal open={isModalOpen1} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2>SEND A REPLY BASED ON CLAIMER'S DESCRIPTION</h2>
          <TextField
            label="Username"
            name="username"
            value={selectedUsername}
           sx={{display:'none'}}
        
            hidden
          />
          <TextField
            label="Message"
            name="message"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" onClick={handleDecision}>Send</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Verify;
