import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <>
    <div className="fixed top-0 left-0 w-full flex items-center justify-between
     px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-900">
      <h1 className="text-2xl text-white font-bold">Logo</h1>
      <button className="bg-white text-black px-5 py-2 
      rounded-full cursor-pointer hover:bg-slate-200 transition" onClick={()=>navigate("/login")}>Sign In</button>
    </div>
    </>
  )
}

export default Navbar