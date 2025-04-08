import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  useEffect(() => {
    toast.info('Please allow 3rd party cookies for this project.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#ffffff',           // White background
        color: '#000000',                // Black text
        borderLeft: '6px solid #22c55e', // Green accent (Tailwind green-500)
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        fontWeight: '500',
      },
      progressStyle: {
        color: '#22c55e',           // Green progress bar
      },
    });
  }, []);

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
