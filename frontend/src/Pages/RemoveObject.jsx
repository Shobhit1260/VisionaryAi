import React from 'react'
import {Edit, Eraser, Hash, Scissors, Sparkles} from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reportError } from '../utils/reportError';
import Loader from '../Components/Loader'
axios.defaults.baseURL=import.meta.env.VITE_API_BASE_URL;
function RemoveObject() {
  const [input,setInput]=React.useState('');
  const [object,setObject]=React.useState('');
  
  const [content,setContent]=React.useState('');
  const [loading,setLoading]=React.useState(false);
  const {getToken}=useAuth(); 
    
    const submitHandler=async(e)=>{
      e.preventDefault();
      
      setLoading(true);
      const formData=new FormData();
      formData.append('image',input);
      formData.append('object',object);

      
      try{
        const {data}=await axios.post('/removeObject',formData,
          {headers:{ Authorization:`Bearer ${await getToken()}` }}
        );
        if(data.success){
          setContent(data.content)
        } else {
          toast.error("Something went wrong");
        }
      }
      catch(error){
        reportError(error, "Failed to remove object. Please try again.");
      }
      finally{
        setLoading(false);
        setInput('')
      }
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={submitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
        <div className='flex ites-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={(e)=>setInput(e.target.files[0])}  type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border-none  bg-transparent' placeholder='No file chosen' required />
      <br/>
      <p className='mt-6 text-sm font-medium'>Describe Object name to remove </p>
      <textarea onChange={(e)=>setObject(e.target.value)} value={object} rows={4} className=' w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='e.g.., watch or spoon,Only single object name...' required />
      <button type="submit" disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        {loading ? <Loader size={24}/> : <Eraser className='w-5'/>} Remove Object
      </button>
      </form>
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]' >
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        {
          loading ? (
            <div className='flex-1 flex justify-center items-center'>
              <Loader size={240} />
            </div>
          ) : (
            !content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Scissors className='w-9 h-9'/>
                  <p>Upload an image and click "Remove Object" to get started </p>
                </div>
              </div>
            ) : (
              <div className='w-full mt-5 overflow-y-scroll text-sm text-slate-800' >
                <img className="" src={content} alt="image"  />
              </div>
            )
          )
        }
        
      </div>
    </div>
  )
}

export default RemoveObject
