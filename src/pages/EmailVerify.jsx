import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from '../axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, getUserData , userData, isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    e.target.value = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    const pasteArray = paste.split('');

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    if (inputRefs.current[pasteArray.length - 1]) {
      inputRefs.current[pasteArray.length - 1].focus();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value.trim());
    const otp = otpArray.join('');

    if (otp.length < 6) {
      return toast.error('Please enter all 6 digits');
    }

    try {
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to bg-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
        alt='Logo'
      />
      <form
        onSubmit={onSubmitHandler}
        className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'
      >
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>
          Email Verification OTP
        </h1>
        <p className='text-center mb-6 text-indigo-300'>
          Enter the 6-digit code sent to your email id
        </p>
        <div onPaste={handlePaste} className='flex justify-between mb-8'>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type='text'
                maxLength='1'
                required
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
