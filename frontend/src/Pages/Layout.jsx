import React, { use } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {assets} from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

function Layout() {
  const navigate=useNavigate();
  const [sideBar,setSideBar]=useState(false);
  const { user } = useUser();
  return user?(
    // Use a fixed viewport-height container and keep scrolling inside the content area
    <div className='flex flex-col h-screen overflow-hidden'>
      <nav className='p-2 px-4 flex justify-between w-full items-center border-b border-gray-200 h-[64px]'>
        <img src={assets.logo} className='cursor-pointer w-32 sm:w-44 'alt="logo" onClick={()=>navigate('/')}/>
        {
          sideBar ? <X onClick={()=>setSideBar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/>: <Menu onClick={()=>setSideBar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
        }

      </nav>
      <div className='w-full flex flex-1' style={{ height: 'calc(100vh - 64px)' }}>
        <Sidebar sideBar={sideBar} setSideBar={setSideBar}/>
        {/* Make the main content scrollable instead of the whole page */}
        <div className='flex-1 bg-[#F4F7FB] overflow-auto'><Outlet/></div>
      </div>
    </div>
    
  ): <div className='flex justify-center items-center h-screen'>
    < SignIn />
  </div>
}

export default Layout
