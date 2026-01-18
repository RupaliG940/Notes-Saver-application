import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/paste'
import Viewpaste from './components/Viewpaste'
import { Toaster } from 'react-hot-toast'



const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
      <Navbar/>
      <Home/>
      </div>
    },
    {path:"/pastes",
     element:
      <div>
      <Navbar/>
      <Paste/>
        
      </div>
    },
   {
     path:"/pastes/:id",
     element:
      <div>
      <Navbar/>
      <Viewpaste/>
        
      </div>
    },
  ]
)

function App() {
  return (
    <div >
      <Toaster position="top-right" reverseOrder={false} />

     <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
