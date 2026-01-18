import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTOPastes, updateTopastes } from '../redux/pastesSlice';





const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  
  const allpastes = useSelector((state) => 
    state.paste.pastes);
  function createPaste(){
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    
    if(pasteId){
      dispatch(updateTopastes(paste));
    } else {
      dispatch(addTOPastes(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  useEffect(() => {
  if (!pasteId) return;

  const paste = allpastes.find(p => p._id === pasteId);

  if (!paste) return;

  setTitle(paste.title);
  setValue(paste.content);
}, [pasteId, allpastes]);


  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <button onClick={createPaste} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your paste content here..."
          rows={18}
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
        />
      
      </div>
    </div>
  );
};

export default Home;
