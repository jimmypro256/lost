import {   AccountCircle, Logout, Edit, Phone, List, Verified, ArrowCircleDownTwoTone } from '@mui/icons-material'
import { Box, Stack} from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'

import axios from 'axios';


import { NavLink } from 'react-router-dom'




function AdminSidebar() {





  
  





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



  return (
    



        <Box width={{ xs: '100%', sm: '15%' }} className="border border-gray-400 bg-black "  height={{ sm: '75vh' }}>
              <Box margin="10px" >



                       <NavLink to="/admin">
                        <div className='flex items-center gap-3 mt-2 hover:bg-blue-800 hover:ml-3 p-3 transition-[0.5s]'>
                            <AccountCircle sx={{color:'white', fontSize:'2.2em'}}/>
                  
                            <h5 className='text-white font-medium uppercase'>Users</h5>
                        
                        </div>
                        </NavLink>

                            
                       <NavLink to="/adminfound">
                        <div className='flex items-center gap-3 mt-2 hover:bg-blue-800 hover:ml-3 p-3 transition-[0.5s]'>
                            <List sx={{color:'white', fontSize:'2.2em'}}/>
                  
                            <h5 className='text-white font-medium  uppercase'>Items</h5>
                        
                        </div>
                        </NavLink>

                        <NavLink to="/claim">
                        <div className='flex items-center gap-3 mt-2 hover:bg-blue-800 hover:ml-3 p-3 transition-[0.5s]'>
                            <ArrowCircleDownTwoTone sx={{color:'white', fontSize:'2.2em'}}/>
                  
                            <h5 className='text-white font-medium  uppercase'>Claims</h5>
                        
                        </div>
                        </NavLink>

                        <NavLink to="/verify">
                        <div className='flex items-center gap-3 mt-2 hover:bg-blue-800 hover:ml-3 p-3 transition-[0.5s]'>
                            <Verified sx={{color:'white', fontSize:'2.2em'}}/>
                  
                            <h5 className='text-white font-medium  uppercase'>Verification</h5>
                        
                        </div>
                        </NavLink>



                     


                        <NavLink to="/register">
                        <div className='flex items-center gap-3 mt-2 hover:bg-blue-800 hover:ml-3 p-3 transition-[0.5s]'>
                            <Edit sx={{color:'white', fontSize:'2.2em'}}/>
                  
                            <h5 className='text-white font-medium  uppercase'>Register</h5>
                        
                        </div>
                        </NavLink>


                      

                        



                        
                        <NavLink to="/">
                        <div className='flex items-center gap-3 mt-2 hover:bg-blue-800 hover:ml-3 p-3 transition-[0.5s]'>
                            <Logout sx={{color:'white', fontSize:'2.2em'}}/>
                  
                            <h5 className='text-white font-medium  uppercase'> Logout</h5>
                        
                        </div>
                        </NavLink>



                     


                      

                       

                       
                        

     </Box>
     </Box>
  )
}

export default AdminSidebar;
