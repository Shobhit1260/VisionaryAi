import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';

function Community() {
  const [creations,setCreations]=useState(dummyPublishedCreationData);
 const {user}=useUser(); 
  const fetchCreations = async () => {
    // In this demo we use the bundled dummy data. In a real app this would
    // call an API and set the results.
    setCreations(dummyPublishedCreationData)
  }

  // Load creations on mount (show community to anonymous users as well).
  useEffect(() => {
    fetchCreations()
  }, [])
  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
      Creations
      <div className='bg-white h-full w-full rounded-xl overflow-y-auto p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            creations.map((creation, index) => (
              <div key={creation.id ?? index} className='relative group'>
                <img src={creation?.content} alt="" className='w-full h-48 object-cover rounded-lg' />

                <div className='absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-b from-transparent to-black/40 text-white rounded-lg opacity-0 group-hover:opacity-100 transition'>
                  <p className='text-sm mb-2'>{creation.prompt}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Heart className='w-5 h-5 text-white hover:scale-110 cursor-pointer' />
                      <span>{creation?.likes?.length ?? 0}</span>
                    </div>
                    <div className='text-xs text-gray-200'>@{creation.user_id?.slice(0,6)}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Community
