import React from 'react'

function Details() {
    return (
     
    <div className='bg-white text-gray-400  flex justify-center items-start  p-4 h-screen '>
      <div className='rounded-xl bg-gray-900 w-64 h-96 '>
        <img className='h-60 w-full object-cover'   src="https://s3-eu-west-1.amazonaws.com/images.linnlive.com/4026ef0cc7c4844b9d335306aa30fe5c/6c4c5311-ee72-4b46-a734-0c4887bbeb07.jpg"
      alt="Product"/>
      <h3 className='mt-4 text -sm text-gray-700 '> product title</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">Product price</p>
    <a href="#" className="mt-2 flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700">
      Add to cart
    </a>
      </div>
      </div>
    
  )

}

export default Details
