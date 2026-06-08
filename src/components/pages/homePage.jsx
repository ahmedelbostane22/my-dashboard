import React from 'react'
import Post from '../Layout/posts'
import Header from '../Layout/header'

function HomePage({search, setSearch}) {
  return (
    <>
    <Header search={search} setSearch={setSearch}/>
     <Post search={search}/> 
    </>
  )
}

export default HomePage
