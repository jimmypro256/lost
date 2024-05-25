
import {  Logout,  FeedbackOutlined, ShareRounded, PresentToAll,  InfoOutlined, MessageRounded,  PersonRemoveAlt1, NoteAdd, RemoveRedEye, Print, Search } from '@mui/icons-material'
import { Box, Stack,  Button, Modal, Breadcrumbs, TextField, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import {Alert, Share, View} from 'react-native';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import { NavLink , Link} from 'react-router-dom'

import Sidebar from './sidebar';
import { RateReviewTwoTone } from '@material-ui/icons';
import Navbar from './navbar';
import Footer from './footer';


function ViewLost() {
  const [loading, setLoading] = useState(true);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Lost');
        let data = await response.json();
  
        // Sort the data based on searchNumber in descending order
        data.sort((a, b) => b.searchNumber - a.searchNumber);
  
        setFoundItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedReward, setSelectedReward] = useState('');
 


  const handleClose = () => {
    setOpenModal2(false);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };


  const onShare = async (itemName, description) => {
    try {
      const message = `Item Name: ${itemName}\nDescription: ${description}`;
      const result = await Share.share({
        message: message,
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
  


  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/searchlost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
      console.log('Search results:', data);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };




const handleRewardButtonClick = (reward) => {
  setSelectedReward(reward);
  setOpenModal3(true);
};

  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
    <Navbar/>
    <Footer/>

      {/* Main Content */}
      <div className='mt-[100px]'>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='m-2 ' gap="10px">


      <Sidebar/>
       

           


          <Box width={{ xs: '100%', sm: '85%' }} className="border border-slate-400 bg-white " height={{ sm: '75vh' }} >
                  <div className='flex justify-between items-center p-3 border border-gray-100 bg-slate-50  m-1 mx-2'>
                  <div className=' flex gap-5'>
                      <Button onClick={() => setOpenModal1(true)} variant='contained' > <FeedbackOutlined/> Feedback </Button>
                    <Button onClick={() => setOpenModal2(true)} variant='contained' color='secondary'><RateReviewTwoTone/> Rate Us </Button>
                      <Button onClick={onShare} variant='contained' color='success'><ShareRounded/> Share </Button>
                      {/* <Button variant='contained' color='error'>NOTIFICATIONS</Button> */}
                    </div>

               


                    <div className=''>
                    <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="primary" to="/found">
                      <p className=' text-[1.3em] hover:underline'>Found Items</p>
                    </Link>
                    <Link underline="hover" color="inherit" to="#">
                    <p className=' text-[1.3em] text-blue-700 hover:underline'>Lost Items</p>
                    </Link>
                   
                  </Breadcrumbs>
                         


                    </div>

                  <div className='p-1 border bg-white px-7 border-gray-800 flex rounded-xl gap-3 items-center'>
                    <input className='outline-none p-1 rounded-lg'   value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} placeholder="search items" type='text'/>
                  <Search color='primary' onClick={handleSearch} sx={{fontSize:'2em', color:'white', cursor:'pointer'}}/>
                  </div>
                  </div>



                  <Box className='border border-gray-400 overflow-y-auto bg-slate-50' height='62vh' display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={3} p={1} m={2}>
         {/* Render cards dynamically */}
          {/* Render search results or Skeleton while loading */}
          {(loading ? Array.from(new Array(8)) : (searchResults.length > 0 ? searchResults : foundItems)).map((item, index) => (
              <Card key={index} >
              {loading ? (
                <Skeleton variant="rectangular" sx={{backgroundColor:'darkblue'}} width="100%" height={250} />
              ) : (
                <>
                 <CardActionArea>
                  {/* Image */}
                   {item.imagePath && <img src={`http://localhost:5000/` + item.imagePath} alt={`Image ${index + 1}`} className='w-full h-60 border border-white rounded-none mb-2' />} 
       {/* Description */}
      
                  {/* Contact */}

                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  
                </CardContent>
                  </CardActionArea>
                 <div>
                <hr></hr>

                 <CardActions style={{
                  display:'flex',
                  justifyContent:'space-between',
           
                 }}>
                  <Button onClick={() => onShare(item.itemName, item.description)}  size="small" color="primary">
                  <ShareRounded />Share
                  </Button>


                       
                 {item.reward !== '' && (
          <Button variant='contained' onClick={() => handleRewardButtonClick(item.reward)}>REWARD</Button>
          
        )}

                </CardActions>

                  
        
             

          
                 </div>
                </>
              )}
          </Card>
          ))}


        </Box>
          </Box>

          
        </Stack>
      </div>


      {/* Modals */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'>Uploaded Successfully!</h2>

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
          <h6 className='text-[1.2em] text-center mb-3 p-3 text-gray-800  font-medium'> ENTER YOUR FEEDBACK BELOW</h6>
          <hr></hr>
          <TextField
            label="feedback"
            multiline
            // value={feedback}
            // onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            margin="normal"
          />
          
          <Button variant="contained">
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
        <h2 style={{ textAlign: 'center' }} className='font-medium'>RATE US</h2>
        <hr></hr>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }} className='my-5'>
          {[...Array(5)].map((_, index) => (
            <div key={index} onClick={() => handleStarClick(index)}>
              {index < rating ? (
                <StarIcon sx={{ fontSize: 50, color: 'blue' }} />
              ) : (
                <StarBorderIcon sx={{ fontSize: 40, color: 'blue' }} />
              )}
            </div>
          ))}
        </div>
        <hr></hr>

        <div className='flex justify-center mt-4'>

          
        <Button variant='contained' color='secondary' onClick={handleClose}>OK</Button>
          
        </div>
      </Box>
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
          <h6 className='text-[1.2em] text-center mb-3 p-3 text-gray-800  font-medium'> ENTER YOUR FEEDBACK BELOW</h6>
          <hr></hr>
          <TextField
            label="feedback"
            multiline
            // value={feedback}
            // onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            margin="normal"
          />
          
          <Button variant="contained">
           SEND
          </Button>
        </Box>
      </Modal>



      {/* rate modal */}

        {/* Reward Modal */}
        <Modal
        open={openModal3}
        onClose={() => setOpenModal3(false)}
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
          <h2 style={{ textAlign: 'center' }} className='font-medium'>REWARD</h2>
          <hr />
          <p className='text-base text-center text-gray-800'>{selectedReward}</p>
        </Box>
      </Modal>
    </div>
  )
}

export default ViewLost;
