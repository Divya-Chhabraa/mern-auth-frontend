import React ,{useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from '../axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

const navigate =useNavigate()

const {backendUrl}=useContext(AppContext)
axios.defaults.withCredentials=true

const [email, setEmail] =useState('')
const [newPassword, setNewPassword] =useState('')
const[isEmailSent, setIsEmailSent]=useState('')
const[otp, setOtp]=useState(0)
const[isOtpSubmitted, setIsOtpSubmitted]=useState(false)

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

const onSubmitEmail= async(e)=>{
  e.preventDefault();
  try{
    const {data}=await axios.post(backendUrl+'/api/auth/send-reset-otp', {email})
    data.success ? toast.success(data.message):toast.error(data.message)
    data.success && setIsEmailSent(true)
  }catch(error){
    toast.error(error.message)
  }
}

const onSubmitOtp= async(e)=>{
  e.preventDefault();
  const otpArray=inputRefs.current.map(e => e.value)
  setOtp(otpArray.join(''))
  setIsOtpSubmitted(true)

}

const onSubmitNewPassword= async(e)=>{
  e.preventDefault();
  try{
    const {data}=await axios.post(backendUrl+'/api/auth/reset-password', {email, otp, newPassword})
    data.success ? toast.success(data.message):toast.error(data.message)
    data.success && navigate('/login')
  }catch(error){
    toast.error(error.message)
  }

}

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to bg-purple-400'>
        <img
                onClick={() => navigate('/')}
                src={assets.logo}
                className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
                alt='Logo'
              />

      {!isEmailSent &&

      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className='text-white text-2xl font-semibold text-center mb-4'>
      Reset Password
      </h1>
      <p className='text-center mb-6 text-indigo-300'>
        Enter your registered email id
      </p>
      <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
        <img className='w-3 h-3' src={assets.mail_icon} />
        <input type='email' placeholder='Email id' 
        className='bg-transparent outline-none text-white' value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} required/>
      </div>

      <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Send OTP</button>
        </form>
}

{!isOtpSubmitted && isEmailSent &&

        <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>
      Reset Password OTP
      </h1>
        <p className='text-center mb-6 text-indigo-300 mt-6'>
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
    <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
    Submit
    </button>
      </form>

      }

{isOtpSubmitted && isEmailSent && 

  <form  onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className='text-white text-2xl font-semibold text-center mb-4'>
      New Password
      </h1>
      <p className='text-center mb-6 text-indigo-300'>
        Enter the new password below
      </p>
      <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
        <img className='w-3 h-3' src={assets.lock_icon} />
        <input type='password' placeholder='Password' 
        className='bg-transparent outline-none text-white' value={newPassword} onChange={(e)=>{
          setNewPassword(e.target.value)
        }} required/>
      </div>

      <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
  </form>
}

    </div>
  )
}

export default ResetPassword