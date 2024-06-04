import {  Logout,  FeedbackOutlined, ShareRounded,  PresentToAll,  InfoOutlined, MessageRounded,  PersonRemoveAlt1, NoteAdd, RemoveRedEye, Print, Search } from '@mui/icons-material'
import { Box, Stack,  Button, Modal, TextField, Skeleton, Breadcrumbs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {Alert, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {  Link } from 'react-router-dom'

import AdminSidebar from './adminsidebar';
import { RateReviewTwoTone } from '@material-ui/icons';
import Navbar from './navbar';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import AdminBar from './adminbar';

function AdminFound() {
  const [loading, setLoading] = useState(true);
  const [foundItems, setFoundItems] = useState([]);


  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCounts, setSearchCounts] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [rating, setRating] = useState(0);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    _id: '',
    itemName: '',
    description: '',
    contact: ''
  });

  useEffect(() => {
    // Fetch data
    // Populate foundItems state
  }, []);

  const handleEditModalOpen = (item) => {
    setEditFormData({
      _id: item._id,
      itemName: item.itemName,
      description: item.description,
      contact: item.contact
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${editFormData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });
      if (response.ok) {
        // Update foundItems state or refresh data
        setEditModalOpen(false);
            // Refresh account list or update UI accordingly
      setSuccessModalOpen(true)
      window.location.reload();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setFoundItems(foundItems.filter(item => item._id !== itemId));
            // Refresh account list or update UI accordingly
      setSuccessModalOpen(true)
      window.location.reload();
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
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
  

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/search', {
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
  



 

  
const handleFeedback = () => {
  setOpenModal1(false);
  setSuccessModalOpen(true)
};

const [username, setUsername] = useState('');

useEffect(() => {
  // Retrieve username from local storage
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
  }
}, []);

  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
     <AdminBar/>
     <Footer/>
    
      {/* Main Content */}
      <div className='mt-[100px]'>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='m-2 ' gap="10px">


        <AdminSidebar/>
    


          <Box width={{ xs: '100%', sm: '85%' }} className="border border-slate-400 bg-white " height={{ sm: '75vh' }} >
                  <div className='flex justify-between items-center border p-3 border-gray-100 bg-slate-50  m-1 mx-2'>
                  <div className=' flex gap-5'>
                  <h2 className='text-center font-medium text-lg'>.</h2>
                    </div>

               


                    <div className=''>
                    <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="primary" to="#">
                      <p className='text-blue-700 text-[1.3em] hover:underline'>Found Items</p>
                    </Link>
                    <Link underline="hover" color="inherit" to="/adminlost">
                    <p className=' text-[1.3em] hover:underline'>Lost Items</p>
                    </Link>
                   
                  </Breadcrumbs>
                         


                    </div>

                  <div className='p-1 bg-white border px-7 border-gray-800 flex rounded-xl gap-3 items-center'>
                    <input className='outline-none p-1 rounded-lg'   value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} placeholder="search items" type='text'/>
                  <Search color='primary' onClick={handleSearch} sx={{fontSize:'2em', cursor:'pointer'}}/>

                  
                  </div>
                  </div>



                  <Box className='border border-gray-100 overflow-y-auto p-3 bg-gray-100' height='62vh' display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={3} p={1} m={2}>
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
                  <Typography variant="body2" color="text.secondary">
                    Contact: {item.contact}
                  </Typography>
                </CardContent>
                  </CardActionArea>
                 <div>
                

                 <CardActions>
                  <Button onClick={() => onShare(item.itemName, item.description)}  size="small" color="primary">
                  <ShareRounded />Share
                  </Button>

                    <Button variant='outlined' onClick={() => handleEditModalOpen(item)} size="small" color="primary">
                        Edit
                    </Button>
                    {/* Add delete button */}
                    <Button variant='outlined' onClick={() => handleDelete(item._id)} size="small" color="error">
                        Delete
  </Button>
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
          <h2 className='text-[2em] font-extrabold text-green-600'> Successful!</h2>

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
            required
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

    {/* Modals */}
    <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'>Sent Successfully!</h2>

        <div className='mt-5 flex justify-center'>
            <p onClick={() => setSuccessModalOpen(false)} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
        </div>
        </div>
      </Modal>


        {/* Edit Modal */}
        <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
          <h2 className='text-center m-3'>Edit Item info</h2>
         <form>
         <TextField
            label="Item Name"
            value={editFormData.itemName}
            onChange={(e) => setEditFormData({ ...editFormData, itemName: e.target.value })}
            fullWidth
            sx={{marginTop:'8px'}}
          /><br></br>

          <TextField
            label="Description"
            value={editFormData.description}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
            fullWidth
            sx={{marginTop:'8px'}}
          /><br></br>
          <TextField
            label="Contact"
            value={editFormData.contact}
            onChange={(e) => setEditFormData({ ...editFormData, contact: e.target.value })}
            fullWidth
            sx={{marginTop:'8px'}}
          /><br></br>
          <Button variant='contained' fullWidth onClick={handleEditSubmit}   sx={{marginTop:'15px'}}>Update</Button>
         </form>
        </Box>
      </Modal>

    </div>
  )
}

export default AdminFound;