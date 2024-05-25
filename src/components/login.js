
import { Box, Stack, CircularProgress, Button, Modal, IconButton, TextField, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


import { GoogleLogin } from '@react-oauth/google';




function Login() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
  
      // Save the username in local storage
      localStorage.setItem('username', formData.username);
       // Extract user ID from the response data
     const userId = response.data._id;

    // Save the username and user ID in local storage
    localStorage.setItem('username', formData.username);
    localStorage.setItem('userId', userId);

  
      console.log(response.data);
  
      // Save additional details in local storage if available
      if (response.data.email) {
        localStorage.setItem('email', response.data.email);
      }
      if (response.data.phone) {
        localStorage.setItem('phone', response.data.phone);
      }
      if (response.data.profilePicture) {
        localStorage.setItem('profilePicture', response.data.profilePicture);
      }
  

        // Log the user type
    console.log('User type:', response.data.userType);
      // Navigate based on user type
      if (response.data.userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError("Wrong username and password")
    }
    setLoading(false);
  };
  

  const handleGoogleLoginSuccess = async (response) => {
    setLoading(true);
    try {
      // Handle Google login success response
      console.log(response);
      navigate('/found'); // Redirect to appropriate page
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setError("Error logging in with Google");
    }
    setLoading(false);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
    setError("Google login failed");
  };

  return (
    <div className='  h-[100vh] font-san'>
      <Box bgcolor='black' position="fixed" width="100%"  paddingY={2} zIndex={9999} className='p-2'>
        <div className='flex justify-between items-center'>
          <NavLink to='/home'>
            <p className='text-white text-[14px] uppercase'>  </p>
          </NavLink>
          <h6 className='text-[1.8em]  text-gray-100  font-bold'>LOST AND FOUND ITEMS SYSTEM</h6>
       
            <IconButton>
            {/* <Settings style={{color:'lavender', fontSize:'1.3em'}}/> */}
            </IconButton>
             

            
         
        </div>
      </Box>

      {/*  */}
      <Box className='bg-white mt-[110px]'>
        <div className='p-2 m-3 flex justify-between items-center'>
          <p className=' sm:text-sm text-xs text-center  font-medium uppercase'></p>
          <div className='gap-3 flex mt-1'>
            
          </div>
        </div>
      </Box>

      {/* Main Content */}
      <div>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='m-2 ' gap="10px">



       


          <Box width="100%">
                  
              <div className='flex overflow-y-auto'>

              <div className="  w-[100%] ">
                 
                    <div className="flex items-center gap-5 my-3 mx-3 justify-center p-3  ">
      

                         
                       <Box boxShadow="0 0 5px gray" backgroundColor="lavender" padding="10px" paddingBottom="25px" width="45%">
         
                          <form className="flex  flex-col gap-5 w-[100%] p-10">


                          
                          <h6 className='text-xl text-gray-800 font-extrabold mb-5 text-center '>LOGIN </h6>

                  
                             
                          <TextField
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            sx={{ backgroundColor: 'white' }}
                          />
                          <TextField
                            name="password"
                            type='password'
                            label="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            sx={{ backgroundColor: 'white' }}
                          />
                                
                                <Button variant="contained" onClick={handleLogin} disabled={loading}>
                                  {loading ? <CircularProgress size={24} /> : 'LOGIN'}
                              </Button>


                              <div className='flex justify-center'>
                              <GoogleLogin
                                buttonText="Login with Google"
                                onSuccess={handleGoogleLoginSuccess}
                                onFailure={handleGoogleLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                style={{ width: '100%' }}
                            />

                              </div>
                                              {error && (
                            <Typography style={{ textAlign: 'center', color: 'red' }}>{error}</Typography>
                          )}

                              <p className='text-center'>Dont have account? <NavLink to="/register"><span className='text-blue-700 cursor-pointer'>Register</span></NavLink> </p>
                           
                       </form>
                       </Box>
      </div>

      </div>

          
              </div>
          </Box>

          
        </Stack>
      </div>


    </div>
  )
}

export default Login;
