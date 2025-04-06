import { createContext , useEffect, useState} from "react";
import axios from "../axios";
import { toast } from "react-toastify";


export const AppContext = createContext()

export const AppContextProvider =(props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)

    const getAuthState= async ()=>{
        try {
            
            const {data} = await axios.post(backendUrl + '/api/auth/is-auth')

            if(data.success){
                setIsLoggedin(true)
                await getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData=async()=>{
        try{
            const {data} = await axios.get(backendUrl +'/api/user/data');
            if (!userData) {
                return <div className='mt-20 text-red'>Loading user info...</div>;
              }
            console.log("Fetched user data:", data.userData);
            data.success ? setUserData(data.userData) : toast.error(data.message)
        }catch(error){
            toast.error(error.message);
        }
        

    }

    useEffect(()=>{
        getAuthState();
    },[])


    const value ={
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    console.log("isLoggedin:", isLoggedin);
console.log("userData:", userData);


    return(
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    )
}
