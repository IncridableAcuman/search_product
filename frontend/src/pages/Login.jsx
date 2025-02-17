import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axios.api";
import { toast } from "react-toastify";
const Login = () => {
  const navigate=useNavigate();
  const [state,setState]=useState("Sign Up");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(state === "Sign Up"){
      try {
        const {data}=await axiosInstance.post('/auth/signup',{name,email,password});
        localStorage.setItem('accessToken',data.accessToken);
        navigate('/');
        toast.success('Successfully joined');
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
      }
      
    }else{
      try {
       const {data}=await axiosInstance.post('/auth/login',{email,password});
      localStorage.setItem('accessToken',data.accessToken);
      navigate('/'); 
      toast.success('Successfully joined');
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
      }
      
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      navigate('/');
    }
  },[navigate]);

  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center 
    justify-between px-10 py-4 text-white">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>navigate('/auth')} >Logo</h1>
      <p></p>
    </div>
    <div className="bg-gradient-to-br from-slate-800 to-slate-950 
    w-full h-screen text-white flex items-center justify-center">
      <div className="flex flex-col items-center bg-gradient-to-br from-sky-500 to-purple-500 p-20 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-3">{state}</h1>
        <form onSubmit={handleSubmit} className="w-full">
          {state === "Sign Up" && (
            <div className="bg-slate-700 w-full rounded-full px-7 py-2 mb-3">
            <input type="text" placeholder="Your Name" 
            className="bg-transparent outline-none w-full" 
            value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
          )}  
          <div className="bg-slate-700 w-full rounded-full px-7 py-2 mb-3">
          <input type="email" placeholder="example@gmail.com" 
          className="bg-transparent outline-none w-full"
           value={email} onChange={(e)=>setEmail(e.target.value)} required />            
          </div>
          <div className="bg-slate-700 w-full rounded-full px-10 py-2 mb-3">
          <input type="password" placeholder="Password" 
          className="bg-transparent outline-none w-full" 
          value={password} onChange={(e)=>setPassword(e.target.value)} required />            
          </div>
          <button className="w-full bg-gradient-to-br from-indigo-700 to-indigo-900 
          rounded-full py-1.5 cursor-pointer">{state}</button>
        </form>
        <div className=" mt-2">
          {state === "Sign Up" ? (
            <p className="text-slate-800">Already have an account?{" "} 
            <span className="text-white cursor-pointer hover:underline" onClick={()=>setState("Sign In")}>Sign In</span></p>
          ) : (
            <p className="text-slate-800">Don`t have an account?{" "}
             <span className="text-white cursor-pointer hover:underline" onClick={()=>setState("Sign Up")}>Sign Up</span></p>
          )}
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Login