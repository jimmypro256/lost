import React, { useState } from 'react';
import { Box, Modal, CircularProgress, Button, IconButton, TextField, MenuItem } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [type, setType] = useState('user');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    profilePicture: null // Changed to null to store file data
  });

   // Update handleInputChange function to handle changes to the "type" field
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setType(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('profilePicture', formData.profilePicture);
      formDataToSend.append('type', type); // Include the "type" field in formDataToSend

      await axios.post('http://localhost:5000/api/accounts', formDataToSend);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error registering:', error);
      alert('Error registering. Please try again later.');
    }
    setLoading(false);
  };

  const handleClose = () => {
    setSuccessModalOpen(false);
    navigate('/');
  };

  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
      {/* Navbar */}
      <Box bgcolor='#000' position="fixed" width="100%" boxShadow="0 0 10px gray" zIndex={9999} className='p-2'>
        <div className='flex justify-between items-center'>
          <NavLink to='/home'>
            <p className='text-white text-[14px] uppercase'> </p>
          </NavLink>
          <h6 className='text-[1.6em] text-gray-100 font-bold'>LOST AND FOUND ITEMS SYSTEM</h6>
          <IconButton>
            {/* <Settings style={{color:'lavender', fontSize:'1.3em'}}/> */}
          </IconButton>
        </div>
      </Box>

      {/* Registration Form */}
      <Box className='flex'>
        <div className="w-[100%]">
          <div className="flex items-center gap-5 my-3 mx-3 mt-[70px] justify-center p-3 h-[70vh] ">
            <Box boxShadow="0 0 10px gray" marginTop="50px" padding="10px" paddingBottom="25px" width="45%">
              <form className="flex flex-col gap-5 w-[100%] p-10">
                <h6 className='text-xl text-gray-800 font-extrabold mb-5 text-center '>SIGN UP </h6>
                <TextField name="username" label="Username" value={formData.username} onChange={handleInputChange} sx={{ backgroundColor: 'white' }} />
                <TextField name="password" type="password" label="Password" value={formData.password} onChange={handleInputChange} sx={{ backgroundColor: 'white' }} />
                <TextField name="email" type="email" label="Email" value={formData.email} onChange={handleInputChange} sx={{ backgroundColor: 'white' }} />
                <TextField name="phone" label="Phone" value={formData.phone} onChange={handleInputChange} sx={{ backgroundColor: 'white' }} />
                <TextField
                  name="type"
                  select
                  label="Type"
                  value={type}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: 'white' }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </TextField>
                {/* Profile Picture Input */}
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleRegister} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'SIGN UP'}
                </Button>
                <p className='text-center'>Already have an account? <NavLink to="/"><span className='text-blue-700 cursor-pointer'>Login</span></NavLink> </p>
              </form>
            </Box>
          </div>
        </div>
      </Box>

      {/* Success Modal */}
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '100px' }}>
          <h2 className='text-[2em] font-extrabold text-green-600'>Registered Successfully!</h2>
          <div className='mt-5 flex justify-center'>
            <p onClick={handleClose} className='text-white bg-blue-600 p-2 mt-4 text-center font-medium text-lg cursor-pointer w-[30%]'>OK</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Register;
