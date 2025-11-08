import { Gem, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import {dummyCreationData} from '../assets/assets'
import { useEffect } from 'react'
import { Protect, useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { reportError } from '../utils/reportError'
import CreationItems from '../Components/CreationItems'
import Loader from '../Components/Loader'
axios.defaults.baseURL=import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
  const [creations,setCreations]=useState([]);
  const [loading ,setLoading]=useState(false);
  const { getToken } = useAuth();

  const getDashboardData=async()=>{
    setLoading(true);
    try{
      const token = await getToken();
      const { data } = await axios.get('/getuserCreations', { headers: { Authorization: `Bearer ${token}` } });
      if(data && data.success){
        setCreations(data.creations || []);
      } 
      setLoading(false);
    }

    catch(error){
      reportError(error, 'Could not load your creations. Showing demo data.');
    }
  }
  useEffect(()=>{
    getDashboardData();
  },[])
  return (
      loading ? (<div  className='h-screen flex justify-center items-center'>
            <Loader size={240} />
          </div>) : (
    <div className="h-full overflow-y-scroll p-6">
      <div className='flex justify-start gap-4 flex-wrap' >
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white'/>
          </div>
        </div>
      </div>
      <div className='space-y-3'>
        <p className='mt-6 mb-4'>Recent Creations</p>
        {
         creations.map((item)=><CreationItems key={item.id} item={item}/>)
        }
      </div>

    </div>
          )
  )
}

export default Dashboard
