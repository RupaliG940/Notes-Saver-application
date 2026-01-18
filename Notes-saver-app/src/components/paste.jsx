import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTopastes } from '../redux/pastesSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter(
    
    (paste) => paste.title.toLowerCase().includes
    (searchTerm.toLowerCase())
    
  );
  
 


  function handleDelete(pasteId){
    dispatch(removeTopastes(pasteId));
  }

  function handleShare(paste) {
  const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

  if (navigator.share) {
    navigator.share({
      title: paste.title,
      text: paste.content,
      url: shareUrl,
    });
  } else {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  }
}
function clearPastes() {
    localStorage.removeItem('pastes');
    window.location.reload();
  }

  return (
    <div  className=" w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6 ">
         <input 
       className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg w-3xl m-4"
       type="search"
       placeholder='search here'
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)} 
       
       />
       <div>
        
        {
          filteredData.length>0 &&
          filteredData.map(
            (Paste) => {
              const formattedDate = Paste.createdAt
            ? new Date(Paste.createdAt).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '—';


              
              return(
                <div
                key={Paste._id}
                className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg m-4" >
                  <div className='font-bold text-2xl'>
                    {Paste.title}
                  </div>
                  <div >
                    {Paste.content}
                  </div>
                  <div className='flex flex-row gap-8 '>
                    
                    <button
                    onClick={() => navigate(`/?pasteId=${Paste._id}`)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
                   >
                   Edit
                  </button>

                    <button
                    onClick={() => navigate(`/pastes/${Paste._id}`)}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
                    >
                    View
                       </button>

                    <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
                    onClick={() => handleDelete(Paste?._id)}>
                      Delete
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
                    onClick={() => {
                      navigator.clipboard.writeText(Paste?.content)
                      toast.success("copied to clipboard")
                    }}>
                      Copy
                    </button>
                    <button
                      onClick={() => handleShare(Paste)}
                     className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
                      >
                     Share
                     </button>

                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                   {formattedDate}
                  </div>

                </div>
              )
            }
          )
        }
       </div>
         <button onClick={clearPastes} className="mt-4 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold">
          Clear All Pastes
        </button>
      </div>


    </div>
  )
}

export default Paste
