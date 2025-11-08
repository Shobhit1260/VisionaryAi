import React from 'react'
import {Edit, GalleryHorizontal, Image, Hash, Sparkles} from 'lucide-react'
import { toast } from 'react-toastify'
import { reportError } from '../utils/reportError';
import Loader from '../Components/Loader'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown'
axios.defaults.baseURL=import.meta.env.VITE_API_BASE_URL;
function GenerateImages() {
  const Style = [
    'Realistic','Ghibli style','Anime style','Cartoon','Fantasy style','Realistic style','3D style','Portait style'
  ]
  const [category,setCategory]=React.useState('Realistic')
  const [input,setInput]=React.useState('')
  const [publish,setpublish]=React.useState(false);

  const [content,setContent]=React.useState('');
    const [loading,setLoading]=React.useState(false);
    const {getToken}=useAuth(); 
    
  
  const submitHandler=async(e)=>{
      e.preventDefault();
      // basic validation
      if(!input || !input.trim()){
        toast.error('Please enter an article topic');
        return;
      }
      setLoading(true);
      const prompt= `Generate an image in ${category} on the description: ${input}. always stop with full sentence .`
      try{
        const {data}=await axios.post('/generateImage',{prompt:prompt, publish:publish},
          {headers:{ Authorization:`Bearer ${await getToken()}` }}
        );
        if(data.success){
          setContent(data.content)
        } else {
          toast.error("Something went wrong");
        }
      }
      catch(error){
        reportError(error, "Failed to generate image. Please try again.");
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
          <Sparkles className='w-6 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>Ai Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea onChange={(e)=>setInput(e.target.value)} value={input} rows={4} className=' w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to see in the image...' required />
        <p className='mt-4 text-sm font-medium'>Category</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {
            Style.map((item) => (
              <span
                onClick={() => setCategory(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${category === item ? 'bg-green-200 text-green-700' : 'text-gray-500 border-gray-300' }`}
                key={item}
              >
                {item}
              </span>
            ))
          }
        </div>
        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e)=>setpublish(e.target.checked)} checked={publish} className='sr-only peer'/>
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm'>Make this image Public</p>

        </div>
     
      <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
         {
          loading ? (<Loader size={18}/>):<Hash className='w-5 '/> 
        } Generate Image
      </button>
      </form>
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]' >
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>Generated Image</h1>
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
                      <Image className='w-9 h-9'/>
                      <p>Enter a topic and click "Generate Image" to get started</p>
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

export default GenerateImages
