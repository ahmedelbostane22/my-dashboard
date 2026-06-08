import React from 'react'
import { NavLink } from 'react-router-dom'
function NotFound() {
  return (
    <div className='text-center bg-black h-screen flex justify-center items-center
    flex-col gap-4'>
        <h1 className='text-3xl font-bold text-center mt-20 bg-black p-64'>404 - Page Not Found</h1>

       <NavLink to="/home">
       
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        
         text-center 
        '>Go Home</button>
       
       </NavLink>
       
    </div>

  )
}

export default NotFound