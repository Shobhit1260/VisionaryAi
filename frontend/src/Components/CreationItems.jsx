import React, { useState } from 'react'
import Markdown from 'react-markdown'

function CreationItems({item}) {
    const [expanded,setExpanded]=useState(false);

  return (
    <div onClick={()=>{setExpanded(!expanded)}} className='p-4 max-w-5xl text-sm bg-white border-gray-200 rounded-lg cursor-pointer'>
      <div className='flex justify-between items-center gap-4'>
        <div className=''>
            <h2 >{item.prompt}</h2>
            <p className='text-gray-500'>{item.type}-{new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full' >
           {item.type}
        </button>
        </div>
        {expanded && 
        <div>
           {
            item.type==='image'?
            <img src={item.result} alt="creation image" className='mt-4 max-w-md w-full'/>
            :
            <div className='mt-4 overflow-y-scroll text-sm text-slate-700 h-full w-full'>
               <div className='reset-tw'><Markdown >{item.content}</Markdown></div> 
            </div>
           }
        </div> 
        }
    
      
    </div>
  )
}

export default CreationItems
