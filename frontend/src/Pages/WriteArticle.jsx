import React from 'react'
import {Edit, Sparkles} from 'lucide-react'
import axios from '../utils/apiClient'
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { reportError } from '../utils/reportError';
import Loader from '../Components/Loader'
import Markdown from 'react-markdown';

function WriteArticle() {

  const articleLength=[
    {length: 800 ,label: 'Short (500-800 words)'},
    {length: 1200 ,label: 'Medium (800-1200 words)'},
    {length: 16000 ,label: 'Long (1200+ words)'},
  ]
  const [selectedLength,setSelectedLength]=React.useState(articleLength[0].length)
  const [input,setInput]=React.useState('');
  const [content,setContent]=React.useState('');
  const [loading,setLoading]=React.useState(false);
  const {getToken}=useAuth(); 
  
  /** @param {any} e */
  const submitHandler=async(e)=>{
    e.preventDefault();
    // basic validation
    if(!input || !input.trim()){
      toast.error('Please enter an article topic');
      return;
    }
    setLoading(true);
    const prompt= `Write a detailed article on the topic ${input} with a length of approximately ${selectedLength} words. always stop with full sentence .`
    try{
      const {data}=await axios.post('/generateArticle',{prompt:prompt, length:selectedLength},
        {headers:{ Authorization:`Bearer ${await getToken()}` }}
      );
      if(data.success){
        setContent(data.content)
      } else {
        toast.error("Something went wrong");
      }
    }
    catch(error){
      reportError(error, "Failed to generate article. Please try again.");
    }
    finally{
      setLoading(false);
      setInput('')
    }
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={submitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>
       <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className=' w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='the future of artificial intelligence is....' required />
        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:wrap sm:max-w-9/11'>
        {
          articleLength.map((item)=>(
            <span onClick={()=>{setSelectedLength(item.length)}} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength===item.length ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300' }`} key={item.length}>{item.label}</span>
          ))
        }
      </div>
      <br/>
      <button type="submit" disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        {loading ? <Loader size={24} /> : <Edit className='w-5' />} Generate Article
      </button>
      </form>
      
        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]' >
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Generated Article</h1>
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
                <Edit className='w-9 h-9'/>
                <p>Enter a topic and click "Generate article" to get started</p>
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

export default WriteArticle
