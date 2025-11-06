import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useUser, useClerk, UserButton, SignedIn } from '@clerk/clerk-react';

function Navbar() {
    const navigate= useNavigate();
  // useUser provides loading/signed-in state — wait for it before rendering
  const { user } = useUser();
  const { openSignIn, openSignUp } = useClerk();
  return (
    <div className='w-full fixed z-40 bg-white flex justify-between items-center px-4 py-3 sm:px-20 xl:px-32 cursor-pointer'>
       <img src={assets.logo} alt="logo" className='w-32 sm:w-44' onClick={()=>navigate('/')} />
      {
        
        user?
          <UserButton />
         : (
            <button
              onClick={() => openSignUp()}
              className="flex justify-center items-center gap-4 px-4 py-2 bg-[#5044E5] rounded-full text-white cursor-pointer"
            >
              Get Started <ArrowRight className='w-6 h-4 '/>
            </button>
          )
        
      }
    </div>
  )
}

export default Navbar
