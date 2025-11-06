import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import { AiToolsData } from '../assets/assets'
import Aitools from '../Components/Aitools'
import Testimonial from '../Components/Testimonial'
import Plan from '../Components/Plan'
import Newletter from '../Components/Newsletter'
import { useAuth } from '@clerk/clerk-react'
import { use } from 'react'

function Home() {
  const { getToken } = useAuth();
 
  const fetchData = async()=>{
    const token= await getToken();
    console.log("token",token);
  }
   useEffect(()=>{
    fetchData();
   },[])

  return (
    <>
      <Navbar/>
      <Hero/>
      <Aitools/>
      <Testimonial/>
      <Plan/>
      <Newletter/>
    </>
  )
}

export default Home
