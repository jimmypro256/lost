import {  Logout, FeedbackOutlined,  ShareRounded,  PresentToAll, InfoOutlined, MessageRounded,  PersonRemoveAlt1, NoteAdd, RemoveRedEye } from '@mui/icons-material'
import { Box, Stack, CircularProgress, Button, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import {Alert, Share} from 'react-native';

import { NavLink } from 'react-router-dom'


import { RateReviewTwoTone } from '@material-ui/icons';
import Navbar from './navbar';
import Footer from './footer';
import Sidebar from './sidebar';

function Lost() {

  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [rating, setRating] = useState(0);

  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    reward: '',

    imagePath: null // Changed to null to store file data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imagePath: file });
  };

  const handleSubmit= async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('reward', formData.reward);
   
      formDataToSend.append('imagePath', formData.imagePath);
      
      await axios.post('http://localhost:5000/api/lost', formDataToSend);
      setSuccessModalOpen(true);
       // Reset form data after successful submission
    setFormData({
      itemName: '',
      description: '',
      reward: '',
      imagePath: null
    });
    } catch (error) {
      console.error('Error registering:', error);
      alert('Error registering. Please try again later.');
    }
    setLoading(false);
  };



  const handleClose = () => {
    setOpenModal2(false);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  const handleFeedback = () => {
    setOpenModal1(false);
    setSuccessModalOpen(true)
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Lost and found sysytem',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
     <Navbar/>
     <Footer/>
      {/* Main Content */}
      <div className='mt-[100px]'>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='m-2 ' gap="10px">



       <Sidebar/>


          <Box width={{ xs: '100%', sm: '80%' }} className="border border-slate-400 bg-white " height={{ sm: '75vh' }} >
                  <div className='bg-slate-50 flex gap-5 p-2 m-1 mx-2 border border-gray-400'>
                      <Button onClick={() => setOpenModal1(true)} variant='contained' > <FeedbackOutlined/> Feedback </Button>
                    <Button onClick={() => setOpenModal2(true)} variant='contained' color='secondary'><RateReviewTwoTone/> Rate Us </Button>
                      <Button onClick={onShare} variant='contained' color='success'><ShareRounded/> Share </Button>
                      {/* <Button variant='contained' color='error'>NOTIFICATIONS</Button> */}
                    </div>
              <div className='flex overflow-y-auto'>

              <div className="  w-[100%] shadow-2xl">
                 
                    <div className="flex items-center gap-5 my-3 mx-3 justify-center bg-slate-100 p-3 h-[60vh] border border-gray-400">
      

                         
                       <Box boxShadow="0 0 10px gray" padding="2px" paddingBottom="10px" borderRadius={2} width="60%">
         
                          <form className="flex  flex-col gap-5 w-[100%] px-5">


                          
                          <h6 className='text-xl text-gray-800 font-extrabold mb-1 text-center '>POST YOUR LOST ITEM  </h6>

                                       
                          <TextField
value={formData.itemName} onChange={handleInputChange}
name='itemName'
  multiline
  label="Item Name"
  sx={{ backgroundColor: 'white' }}
/>

                             
                          <TextField
  value={formData.description} onChange={handleInputChange}
  name='description'
  multiline
  label="Description"
  sx={{ backgroundColor: 'white' }}
/>

<input
  type="file"
  name='imagePath'
  onChange={handleFileChange}
  accept="image/*"
  className="border border-gray-400 p-2 rounded-md"
/>

<TextField
 value={formData.reward} onChange={handleInputChange}
  multiline
  name='reward'
  label="Reward"
  sx={{ backgroundColor: 'white' }}
/>

<Button variant="contained" onClick={handleSubmit} disabled={loading}>
  {loading ? <CircularProgress size={24} /> : 'POST'}
</Button>

                           
                       </form>
                       </Box>
      </div>

      </div>

          
              </div>
          </Box>

          
        </Stack>
      </div>


      {/* Modals */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'>Posted Successfully!</h2>

        <div className='mt-5 flex justify-center'>
            <p onClick={() => setSuccessModalOpen(false)} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
        </div>
        </div>
      </Modal>



         {/* Modal */}
         <Modal
        open={openModal1}
        onClose={() => setOpenModal1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Form Inside Modal */}
          <h6 className='text-[1.2em] text-center mb-3 p-3 text-gray-800  font-medium'> ENTER YOUR FEEDBACK MESSAGE</h6>
          <hr></hr>
          <TextField
            label="feedback"
            multiline
            // value={feedback}
            // onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            margin="normal"
          />
          
          <Button variant="contained" onClick={handleFeedback}>
           SEND
          </Button>
        </Box>
      </Modal>



      {/* rate modal */}

        {/* Modal */}
        <Modal
      open={openModal2}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>RATE US</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {[...Array(5)].map((_, index) => (
            <div key={index} onClick={() => handleStarClick(index)}>
              {index < rating ? (
                <StarIcon sx={{ fontSize: 40, color: 'blue' }} />
              ) : (
                <StarBorderIcon sx={{ fontSize: 40, color: 'blue' }} />
              )}
            </div>
          ))}
        </div>
      </Box>
    </Modal>
    </div>
  )
}

export default Lost;
