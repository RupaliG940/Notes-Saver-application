import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Viewpaste = () => {
  const { id } = useParams();

  const allpastes = useSelector((state) => state.paste.pastes);

  const paste = allpastes.filter((p) => p._id === id)[0];
  console.log("final paste:", paste);

  if (!paste) {
    return (
      <div className="w-full min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-xl">Loading paste...</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full mb-4 p-3 rounded-xl bg-gray-800 border border-gray-700 text-lg"
        />

        <textarea
          value={paste.content}
          rows={18}
          disabled
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 resize-none text-base"
        />
      </div>
    </div>
  );
};

export default Viewpaste;
