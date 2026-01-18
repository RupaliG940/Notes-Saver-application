import React from 'react'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-evenly bg-gray-900 text-amber-50 '>
        <NavLink to="/">
          Home

        </NavLink>
         <NavLink to="/pastes">
          All paste

        </NavLink>


    </div>
  )
}

export default Navbar
