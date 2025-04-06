import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='flex flex-col items-center min-h-screen bg-[url("/bd_img.png")] bg-cover bg-center'>
        <Navbar />
        <Header />

    </div>
  )
}

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

export default Home