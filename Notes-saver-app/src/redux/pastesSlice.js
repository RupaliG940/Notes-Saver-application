import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const loadPastes = () => {
  try {
    const item = localStorage.getItem('pastes');
    const pastes = item ? JSON.parse(item) : [];

    return pastes.map(paste => ({
      ...paste,
      createdAt: paste.createdAt || new Date().toISOString(),
    }));
  } catch (err) {
    console.error('Failed to parse pastes from localStorage:', err);
    localStorage.removeItem('pastes');
    return [];
  }
};


const initialState = {
  pastes: loadPastes()
};

export const pastesSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addTOPastes: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
      toast.success('Paste Created Successfully');
    },

    updateTopastes: (state, action) => {
      const pastes = action.payload;
      const index = state.pastes.findIndex(
        (item) => item._id === pastes._id);
      if (index >= 0) {
        state.pastes[index] = pastes;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste Updated Successfully');
      }
    },

removeTopastes: (state, action) => {
  const pasteId = action.payload;

  const index = state.pastes.findIndex(
    (item) => item._id === pasteId
  );

  if (index >= 0) {
    state.pastes.splice(index, 1);
    localStorage.setItem('pastes', JSON.stringify(state.pastes));
    toast.success('Paste Removed');
  }
},

    resetTOPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
    }
  }
});

export const {
  addTOPastes,
  updateTopastes,
  removeTopastes,
  resetTOPastes
} = pastesSlice.actions;

export default pastesSlice.reducer;
