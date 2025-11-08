import { useUser, useAuth } from '@clerk/clerk-react';
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { dummyPublishedCreationData } from '../assets/assets';
import { reportError } from '../utils/reportError';
import Loader from '../Components/Loader';
axios.defaults.baseURL=import.meta.env.VITE_API_BASE_URL;
function Community() {
  const [creations,setCreations]=useState([]);
  const [loading ,setLoading]=useState(false);
  const [processingLikeId, setProcessingLikeId] = useState(/** @type {any} */ (null));
  const {user}=useUser(); 
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    setLoading(true);
    try{
      const token = await getToken();
      const { data } = await axios.get('/getpublishedCreations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(data && data.success){
        setCreations(data.creations || []);
      } 
      setLoading(false);
    }
    catch(error){
      reportError(error, 'Could not load community creations. Showing demo data.');
      // fallback to demo data so the page still shows content
    }
  }

 
  const toggleLike = async (creationId) => {
    if (!user) return reportError(new Error('Not authenticated'), 'Sign in to like creations.');
    if (processingLikeId === creationId) return; // already processing

    try {
      setProcessingLikeId(creationId);
      const token = await getToken();
      const { data } = await axios.get(`/toggleLike/${creationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data && data.success) {
        const updated = Array.isArray(data.updatedCreation) ? data.updatedCreation[0] : data.updatedCreation;
        if (updated) {
          setCreations(prev => (/** @type {any[]} */ (prev || [])).map((/** @type {any} */ c) => c.id === updated.id ? updated : c));
        } else {
          // if server didn't return the updated item, refetch the list
          fetchCreations();
        }
      } else {
        reportError(new Error(data?.message || 'Failed to toggle like'), 'Could not toggle like.');
      }
    } catch (err) {
      reportError(err, 'Could not toggle like.');
    } finally {
      setProcessingLikeId(null);
    }
  }

  useEffect(() => {
    fetchCreations()
  }, [])
  return (
    loading ? (<div  className='h-screen flex justify-center items-center'>
        <Loader size={240} />
      </div>) : (
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
                      {processingLikeId === creation.id ? (
                        <div className='w-5 h-5 flex items-center justify-center'>
                          <Loader size={18} />
                        </div>
                      ) : (
                        <button
                          type='button'
                          onClick={(e) => { e.stopPropagation(); toggleLike(creation.id); }}
                          className={`p-0 bg-transparent border-0 ${creation?.likes?.includes(user?.id) ? 'text-red-500' : 'text-white'}`}
                          aria-label={creation?.likes?.includes(user?.id) ? 'Unlike' : 'Like'}
                        >
                          <Heart className='w-5 h-5 hover:scale-110 cursor-pointer' />
                        </button>
                      )}
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
    </div>)
  )
}

export default Community
