import { AccountCircleSharp, Logout, Menu, ChevronLeft, Close, Add, Delete, RemoveRedEyeSharp, Report, MessageRounded, Send, Home, VideoCallSharp, NotificationAdd } from '@mui/icons-material'
import { Box, Stack, CircularProgress, Button,  Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios';

import { NavLink } from 'react-router-dom'

import { Settings, Money, ReceiptRounded} from '@mui/icons-material'

function Dash() {

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='bg-slate-50 h-[100vh] font-san'>
      <Box bgcolor='#070429' position="fixed" width="100%" boxShadow="0 0 10px gray" zIndex={9999} className='p-2'>
        <div className='flex justify-between items-center'>
          <NavLink to='/home'>
            <p className='text-slate-900 text-[14px] uppercase'> MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM </p>
          </NavLink>
          <h6 className='text-[1.6em]  text-gray-100  font-bold'>STRESS MANAGEMENT SYSTEM</h6>
       
           <div className='flex gap-3'>

           <p className='  text-white  '>Welcome, @jimmyprologgedin</p>
            <NavLink to="/">
              <p className='text-base text-center text-white font-medium'>
                <Logout />
                Logout
              </p>
             </NavLink>
           </div>
             

            
         
        </div>
      </Box>

      {/* DASHBOARD */}
      <Box className='bg-white mt-[110px] shadow-md ' >
        <div className='p-2 border border-gray-400'>
         
          <div className=' mt-1  '>
               <h6 className='text-[1.2em]   text-gray-500  font-medium'>CLIENT DASHBOARD</h6>
            
          </div>
        </div>
      </Box>

      {/* Main Content */}
      <div className='mt-3'>
        <Stack direction={{ xs: 'column', sm: 'row' }} className='mr-3 ' gap="10px">

            <Box width={{ xs: '100%', sm: '20%' }} className="border border-gray-400 bg-slate-900 "  height={{ sm: '75vh' }}>
              <Box margin="10px" >
                     <NavLink to="/dash">
                        <div className='flex items-center gap-3 mt-4 hover:bg-blue-800 p-3 transition-[0.5s]'>
                            <Home sx={{color:'white', fontSize:'1.7em'}}/>
                      
                            <h5 className='text-white font-medium text-lg'>HOME</h5>
                        
                        </div>
                        </NavLink>

                        <div className='flex items-center gap-3 mt-4 hover:bg-blue-800 p-3 transition-[0.5s] cursor-pointer' onClick={() => setOpenModal(true)}>
                            <NotificationAdd sx={{color:'white', fontSize:'1.7em'}}/>
                      
                            <h5 className='text-white font-medium text-lg'>NOTIFICATIONS <span className='bg-red-800 text-white rounded-full px-3'>5</span></h5>
                       
                        </div>



                        <NavLink to="/content">
                        <div className='flex items-center gap-3 mt-4 hover:bg-blue-800 p-3 transition-[0.5s]'>
                            <VideoCallSharp sx={{color:'white', fontSize:'1.7em'}}/>
                        
                            <h5 className='text-white font-medium text-lg'>RELIEVE CONTENTS</h5>
                    
                        </div>

                        </NavLink>

                        <NavLink to="">
                        <div className='flex items-center gap-3 mt-4 hover:bg-blue-800 p-3 transition-[0.5s]'>
                            <Settings sx={{color:'white', fontSize:'1.7em'}}/>
                   
                            <h5 className='text-white font-medium text-lg'>SETTINGS</h5>
                       
                        </div>
                        </NavLink>

                        <NavLink to="/">
                        <div className='flex items-center gap-3 mt-4 hover:bg-blue-800 p-3 transition-[0.5s]'>
                            <Logout sx={{color:'white', fontSize:'1.7em'}}/>
                       
                            <h5 className='text-white font-medium text-lg'>LOGOUT</h5>
                      
                        </div>
                        </NavLink>
              </Box>

                  
            </Box>



          <Box width={{ xs: '100%', sm: '80%' }} className="border border-slate-400 bg-white" height={{ sm: '75vh' }} >
                 
              <div className='flex gap-1'>

           

                 <div className="h-full sm:overflow-auto w-[100%]">
                 
                    <div className="flex  gap-5 my-3 mx-3 justify-center bg-slate-100 p-3 h-[60vh] border border-gray-400">
      
                          <form className="flex  flex-col gap-5 w-[80%]">
                          <h6 className='text-[1.2em] text-center  text-gray-500  font-medium'>FILL THE FORM BELOW</h6>

                           <hr className='border border-gray-400'></hr>
                                <div className='flex gap-4 w-full mt-3'>
                                <TextField  sx={{backgroundColor:'white', width:'100%'}}></TextField>
                                <TextField  sx={{backgroundColor:'white', width:'100%'}}></TextField>
                                </div>
                            
                                <div className='flex gap-4 w-full mt-3'>
                                <TextField  sx={{backgroundColor:'white', width:'100%'}}></TextField>
                                <TextField  sx={{backgroundColor:'white', width:'100%'}}></TextField>
                                </div>

                                <div className='flex gap-4 w-full mt-3'>
                                <TextField  sx={{backgroundColor:'white', width:'100%'}}></TextField>
                                <TextField  sx={{backgroundColor:'white', width:'100%'}}></TextField>
                                </div>
                           
                       
                            <Button variant="contained" >Upload</Button>
                          </form>
                    </div>
             
            </div>


    


           
              </div>
          </Box>

      
         
        </Stack>
      </div>


      
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
          <h6 className='text-[1.2em] text-center mb-3 p-3 text-gray-800  font-medium'>REPLIES FROM COUNCILORS</h6>
          <hr></hr>
                <div className=' p-2 rounded-xl m-2 bg-slate-300'>
                  <p className=' m-2'>Hello....</p>
                </div>

                <div className=' p-3 rounded-xl m-2 bg-slate-800'>
                  <p className='text-white m-2'>Hello....Morning . Stress management system</p>
                </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Dash;
