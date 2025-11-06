import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();
  return (
    <div
      className="min-h-full px-4 py-32 sm:px-20 xl:px-32 w-full relative inline-flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
     <div className='text-center mb-6'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold  mx-auto leading-[1.2]'>Create amazing content <br/>with <span className='text-[#5044E5]'>Ai tools</span></h1>
      <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600 mb-8'>Tranform your content creation aith out suite of premium Ai tools. Write articles , generate images ,and enhance your workflow.</p>
      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button onClick={()=>navigate('/ai')} className='bg-[#5044E5] text-white py-2 px-4 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>start creating now</button>
        <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>watch demo</button>
      </div>
      <div className='flex justify-center items-center gap-4 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="hero image" className='h-8'/>
        <p>Trusted by 10k+ people</p>
      </div>
     </div>
    </div>
  )
}

export default Hero
