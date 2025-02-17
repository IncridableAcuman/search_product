import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'
import axiosInstance from '../api/axios.api';
const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const login=(userData)=>{
        setUser(userData);
    };
    const logout=()=>{
        setUser(null);
    };

    const getUserData= async ()=>{
        try {
            const {data}=await axiosInstance.get('/auth/user');
            setUser(data);
        } catch (error) {
            toast.error(error.respoone.data.message || "Someting went wrong");
        }
    }
    useEffect(()=>{
        getUserData();
    },[user])



    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;