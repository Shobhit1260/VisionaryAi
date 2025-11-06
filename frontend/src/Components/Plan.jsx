import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

function Plan() {
  return (
    <div className='max-w-2xl mx-auto py-8 z-20'>
    <div className='text-center'>
      <h1 className='text-slate-700 font-semibold my-2 text-[42px] '>Choose Your Plan</h1>
      <p className='text-gray-500 max-w-lg mx-auto'>Start for free and scale up as grow. Find the perfect plan for your content creation needs. </p>
    </div>
    <div className='mt-14 max-sm:mx-8'>
        <PricingTable/>
    </div>
    </div>
  )
}

export default Plan;
