import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react";

const Auth = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      navigate('/');
    }
  },[navigate])
  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-br from-blue-200 to-purple-400 
    w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">Salom Dasturchi</h1>
        <p className="text-3xl font-bold text-indigo-700 mb-3">Dasturlash mahoratingizni biz bilan davom ettiring</p>
        <button className="mt-3 bg-white px-3 py-2 rounded 
        font-semibold shadow-lg cursor-pointer
         hover:bg-indigo-800 transition" onClick={()=>navigate('/login')}>Hoziroq boshlash</button>
        <p></p>
      </div>
    </div>

    </>
  )
}

export default Auth