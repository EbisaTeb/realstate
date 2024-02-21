import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
  const [landLoard,setLandLoard]=useState(null);
  const [message,setMessage]=useState('');
  useEffect(()=>{
    const fetchLandLoard = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLoard(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchLandLoard();
  },
  [listing.userRef])
  const onChange=(e)=>{
    setMessage(e.target.value);
  }
  
  return (
    <>
    {landLoard && (<div className='flex flex-col gap-2'>
      <p>Contact <span className='font-semibold'>{landLoard.username}</span> for 
      <span className='font-semibold'> {listing.name.toLowerCase()}</span></p>
      <textarea  name='message' id='message'  rows='2' value={message} onChange={onChange}
       className='w-full border p-3 rounded-lg ' placeholder='Enter your message here...'></textarea>
       <Link to={`mailto:${landLoard.email}?subject=Regarding${ listing.name}&body=${message}`
       }
       className='bg-slate-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95'
      >
        Send Message</Link>
       </div>)
      
      
      }
    </>
  )
}
