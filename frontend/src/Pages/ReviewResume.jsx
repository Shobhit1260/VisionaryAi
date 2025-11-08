import React from 'react'
import {Edit, Eraser, FileText, Hash, Sparkles} from 'lucide-react'
import { toast } from 'react-toastify';
import { reportError } from '../utils/reportError';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import Loader from '../Components/Loader'
import Markdown from 'react-markdown';
axios.defaults.baseURL=import.meta.env.VITE_API_BASE_URL;
function ReviewResume() {
  
  const [input,setInput]=React.useState('')
  const [content,setContent]=React.useState('');
    const [loading,setLoading]=React.useState(false);
    const {getToken}=useAuth(); 
    
    const submitHandler=async(e)=>{
      e.preventDefault();
      
      setLoading(true);
      const formData=new FormData();
      formData.append('resume',input);
      
      try{
        const {data}=await axios.post('/reviewResume',formData,
          {headers:{ Authorization:`Bearer ${await getToken()}` }}
        );
        if(data.success){
          setContent(data.content)
        } else {
          toast.error("Something went wrong");
        }
      }
      catch(error){
        reportError(error, "Failed to review resume. Please try again.");
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
          <Sparkles className='w-6 text-[#00DA83]'/>
          <h1 className='text-xl font-semibold'>Review Resume </h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={(e)=>setInput(e.target.files[0])}  type="file" accept='application/pdf' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border-none  bg-transparent' placeholder='No file chosen' required />
        <span className='text-xs text-gray-500 font-light mt-1'> Supports PDF resume only</span>
      <br/>
      <button type="submit" disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        {loading ? <Loader size={24}/> : <Eraser className='w-5'/>} Review Resume
      </button>
      </form>
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]' >
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#00DA83]'/>
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
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
                  <FileText className='w-9 h-9'/>
                  <p>Enter a file and click "Review Resume" to get started</p>
                </div>
              </div>
            ) : (
              <div className='w-full mt-5 overflow-y-scroll text-sm text-slate-800' >
                <Markdown>{content}</Markdown>
              </div>
            )
          )
        }  
      </div>
    </div>
  )
}

export default ReviewResume
