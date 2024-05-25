import React, { useState, useEffect } from 'react';
import { Box, IconButton, Badge, Tooltip, Menu, MenuItem, Button, TextField, Modal } from '@mui/material';
import { Settings, Notifications, Mail, ArrowDropDown } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({ username: '', email: '', phone: '' });
  const [notifications, setNotifications] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    // Retrieve username, email, and phone from local storage
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedPhone = localStorage.getItem('phone');
    const storedProfilePicture = localStorage.getItem('profilePicture');
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPhone) {
      setPhone(storedPhone);
    }
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };

  const handleOpenModal = () => {
    setEditedUserInfo({ username, email, phone });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen1(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Submit edited user profile information
      await axios.put('http://localhost:5000/api/edit', editedUserInfo);
      console.log('Edited User Info:', editedUserInfo);
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleReplySubmit = async () => {
    try {
      // Send the reply to the backend
      await axios.post('http://localhost:5000/api/replies', {
        username,
        message: replyMessage,
      });
      // Optionally, you can close the modal or show a success message
      setIsModalOpen2(false);
      setSuccessModalOpen(true)
      // Clear the message field after sending
      setReplyMessage('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };
  


  // Define state variables to store chats
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch chats data from the API
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chats');
        // Update the state with the fetched chats
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    // Call the fetchChats function
    fetchChats();
  }, []); // Empty dependency array ensures the effect runs only once


   // Fetch notifications from the API
   
  useEffect(() => {
   const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/verify');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  fetchNotifications();
}, []);
  return (
    <Box bgcolor='#000' position="fixed" width="100%" paddingBottom="7px" boxShadow="0 0 10px gray" className='p-2'>
      <div className='flex justify-between items-center'>
        <h6 className='text-[1.6em] text-white font-bold'>LOST AND FOUND ITEMS SYSTEM</h6>
        <Box display="flex" alignItems="center">
          <NavLink to="/chat">
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={chats.length} color="error">
                <Mail sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </NavLink>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => setIsModalOpen1(true)}
          >
            <Badge badgeContent={notifications.length} color="error">
              <Notifications sx={{ color: 'white' }} />
            </Badge>
          </IconButton>
          <div className='flex gap-3'>
            <Tooltip title="View profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: '20px' }}>
                <img alt="User Avatar" src={`http://localhost:5000/` + profilePicture} />
              </IconButton>
            </Tooltip>
            <div onClick={handleOpenUserMenu} className='flex items-baseline mt-8 cursor-pointer'>
              <p className='text-white font-medium'>{username}</p>
              <div><ArrowDropDown sx={{ color: 'white' }} /></div>
            </div>
            <div className='flex align-baseline'>
              <IconButton size="large" color='inherit'>
                <Settings onClick={handleOpenUserMenu1} sx={{ color: 'white', fontSize: '1.2em' }} />
              </IconButton>
            </div>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div>
              <p className='text-center'>PROFILE</p>
            </div>
            <hr />
            <div className='flex justify-center m-3'>  <img className='rounded-none' src={`http://localhost:5000/` + profilePicture} /></div>
            <MenuItem>Username: {username}</MenuItem>
            <MenuItem>E-mail: {email}</MenuItem>
            <MenuItem>Phone: {phone}</MenuItem>
            <hr />
            <div className='flex justify-between m-2'>
              <MenuItem>
                <NavLink to="/"><Button variant='outlined' color='error'>Logout</Button></NavLink>
              </MenuItem>
              {/* <Button variant='contained' onClick={handleOpenModal}>UPDATE</Button> */}
            </div>
          </Menu>
          <Menu
            anchorEl={anchorEl1}
            open={Boolean(anchorEl1)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ paddingTop: '10px' }}
          >
            <div className='m-5'>
              <p className='text-center font-medium'>LANGUAGE</p>
            </div>
            <hr />
            <MenuItem>
              <NavLink to="/found">ENGLISH</NavLink>
            </MenuItem>
            <hr />
            <MenuItem>
              <NavLink to="/found1">FRENCH</NavLink>
            </MenuItem>
          </Menu>
        </Box>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2>Edit Profile</h2>
          <TextField
            label="Username"
            name="username"
            value={editedUserInfo.username}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editedUserInfo.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={editedUserInfo.phone}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </Box>
      </Modal>

      <Modal open={isModalOpen1} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2 className='uppercase text-center font-medium'>Notifications</h2>
          <hr></hr>
          {notifications.map((notification, index) => (
            <div key={index}>
           <div className='flex justify-between m-3'>
           <p>{notification.message}</p>
           <Button variant='contained' onClick={() => setIsModalOpen2(true)}> REPLY</Button>
           </div>
            </div>
          ))}
        </Box>
      </Modal>



      <Modal open={isModalOpen2} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2>REPLY</h2>
          <TextField
              label="Username"
              name="username"
              defaultValue={username}
              fullWidth
              variant="outlined"
              margin="normal"
              disabled
            />
          <TextField
            label="message"
            name="message"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        
          <Button variant="contained" onClick={handleReplySubmit}>Send</Button>
        </Box>
      </Modal>

      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'> Successfully sent</h2>

        <div className='mt-5 flex justify-center'>
            <p onClick={() => setSuccessModalOpen(false)} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
        </div>
        </div>
      </Modal>



    </Box>
  );
}

export default Navbar;
