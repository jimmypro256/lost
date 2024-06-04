import {  Logout,  FeedbackOutlined, ShareRounded,  PresentToAll,  InfoOutlined, MessageRounded,  PersonRemoveAlt1, NoteAdd, RemoveRedEye, Print, Search } from '@mui/icons-material'
import { Box, Stack,  Button, Modal, TextField, Skeleton, Breadcrumbs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import {Alert, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {  Link } from 'react-router-dom'

import AdminSidebar from './adminsidebar';
import { RateReviewTwoTone } from '@material-ui/icons';
import AdminBar from './adminbar';
import Footer from './footer';



function Admin() {
  const [loading, setLoading] = useState(true);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
 

  const [accounts, setAccounts] = useState([]);


  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accountsfetch');
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
 

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    _id: '', 
    username: '',
    email: '',
    phone: '',
    password: '',
    type: ''
  });

  const handleEditModalOpen = (account) => {
    if (account._id) { // Check if _id exists
      setEditFormData({
        _id: account._id,
        username: account.username,
        email: account.email,
        phone: account.phone,
        password: account.password,
        type: account.type
      });
      setEditModalOpen(true);
    } else {
      console.error('Account ID is undefined');
    }
  };

  

  const handleEditModalClose = () => {
    // Close the edit modal
    setEditModalOpen(false);
  };




const handleEditSubmit = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/update/${editFormData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    });
    if (!response.ok) {
      throw new Error('Failed to update account');
    }
    // Account updated successfully
    console.log('Account updated successfully');
    window.location.reload();
    setSuccessModalOpen(true)
    // Close the edit modal
    setEditModalOpen(false);
    // Optionally, you can update the account list or UI
  } catch (error) {
    console.error('Error updating account:', error);
    // Handle error (e.g., show error message)
  }
};
  
  const handleDelete = async (accountId) => {
    try {
      // Send delete request to server
      const response = await fetch(`http://localhost:5000/api/accounts/${accountId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      // Account deleted successfully
      console.log('Account deleted successfully');
      // Refresh account list or update UI accordingly
      setSuccessModalOpen(true)
      window.location.reload();
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error (e.g., show error message)
    }
  };




  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
     <AdminBar/>
     <Footer/>
    
      {/* Main Content */}
      <div className='mt-[100px]'>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='m-2 ' gap="10px">


        <AdminSidebar/>
    


          <Box width={{ xs: '100%', sm: '85%' }} className="border border-slate-400 bg-white " height={{ sm: '75vh' }} >
                  <div className=' border  border-gray-100 bg-slate-50  m-1 mx-2'>
                 
               


                   <p className='text-center font-medium text-[1.4em]'>REGISTERED USERS</p>
                  </div>



                    <Box className='border border-gray-100 overflow-y-auto p-3 bg-gray-100' height='62vh' p={1} m={2}>
       

       {/* MUI table */}

       <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Username</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell><b>Phone</b></TableCell>
                      <TableCell><b>Password</b></TableCell>
                      <TableCell><b>Type</b></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account._id}>
                        <TableCell>{account.username}</TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{account.phone}</TableCell>
                        <TableCell>{account.password}</TableCell>
                        <TableCell>{account.type}</TableCell>
                        <TableCell>
                          <Button variant="outlined" onClick={() => handleEditModalOpen(account)}>Edit</Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outlined" color="error" onClick={() => handleDelete(account._id)}>Delete</Button>
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


      {/* Modals */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'> Successfully done</h2>

        <div className='mt-5 flex justify-center'>
            <p onClick={() => setSuccessModalOpen(false)} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
        </div>
        </div>
      </Modal>


         


      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
          <h2 className='text-center font-medium m-3'>Edit Account</h2>
          <form>
            <Stack gap={4}>
            <TextField label="Username" value={editFormData.username} onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })} fullWidth />
            <TextField label="Email" value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} fullWidth />
            <TextField label="Phone" value={editFormData.phone} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} fullWidth />
            <TextField label="Password" value={editFormData.password} onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })} fullWidth />
            <TextField label="Type" value={editFormData.type} onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })} fullWidth />
            <Button variant="contained" color="primary" onClick={handleEditSubmit}>Submit</Button>
            </Stack>
          </form>
        </Box>
      </Modal>

    </div>
  )
}

export default Admin;