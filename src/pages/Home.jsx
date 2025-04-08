import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  
    toast.success('Please allow 3rd party cookies for this project.');

  return (
    <div className='flex flex-col items-center min-h-screen bg-[url("/bd_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
      <ToastContainer />
    </div>
  );
};

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

export default Home;
