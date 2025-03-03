import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-5 place-content-center content-center bg-cyan-950 p-1.5 w-full h-12 !text-2xl '>
      <NavLink
      to="/"
      className= 'text-blue-500'
      >
        Home
      </NavLink>
      <NavLink
      to = "/pastes"
      className='text-white'
      >
        Paste
      </NavLink>
      
    </div>
  )
}

export default Navbar
