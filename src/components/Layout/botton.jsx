import React from 'react'
function Button({value}) {
  return (
    <button 
      onClick={(e) => e.preventDefault()}
          className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-t from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-400 border border-indigo-800 inset-shadow-md inset-shadow-indigo-100 inset-shadow-2xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      {value}
  </button>
  )
}

export default Button