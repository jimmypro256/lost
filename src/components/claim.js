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
import Navbar from './navbar';
import Footer from './footer';
import AdminBar from './adminbar';

function Claim() {
  const [loading, setLoading] = useState(true);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
 
 

  const [accounts, setAccounts] = useState([]);


  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/claim');
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
 

 
  const handleVerify = async (username) => {
  
    try {
      const response = await fetch('http://localhost:5000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          message: 'Send the description for the item you claimed',
        }),
      
      });
      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log("hi")
        setSuccessModalOpen(true);
      } else {
        // Handle failure (e.g., show an error message)
        console.error('Failed to verify item:', response.statusText);
        Alert.alert('Failed to verify item');
      }
    } catch (error) {
      console.error('Error verifying item:', error);
      Alert.alert('Error verifying item');
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
                 
               


                   <p className='text-center font-medium text-[1.4em]'>CLAIMED ITEMS</p>
                  </div>



                    <Box className='border border-gray-100 overflow-y-auto p-3 bg-gray-100' height='62vh' p={1} m={2}>
       

       {/* MUI table */}

       <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Username</b></TableCell>
                      <TableCell><b>Item Name</b></TableCell>
                      <TableCell><b>Description</b></TableCell>
                      <TableCell><b>Claimer Contact</b></TableCell>
                      <TableCell><b>Founder Contact</b></TableCell>
                     
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account._id}>
                        <TableCell>{account.username}</TableCell>
                        <TableCell>{account.itemName}</TableCell>
                        <TableCell>{account.description}</TableCell>
                        <TableCell>{account.phone}</TableCell>
                        <TableCell>{account.contact}</TableCell>
                        <TableCell>
                          <Button variant="contained" onClick={() => handleVerify(account.username)}>Request Description</Button>
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
          <h2 className='text-[2em] font-extrabold text-green-600'>Request Sent !</h2>

        <div className='mt-5 flex justify-center'>
            <p onClick={() => setSuccessModalOpen(false)} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
        </div>
        </div>
      </Modal>

 
    </div>
  )
}

export default Claim;