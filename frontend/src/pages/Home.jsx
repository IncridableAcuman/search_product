import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios.api";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const getPosts = async () => {
    try {
      const { data } = await axiosInstance.get("/post/all");
      setPosts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const PostFilters = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      logout(null);
      localStorage.removeItem("accessToken");
      navigate("/auth");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // Dependency array ichida [posts] bo'lmasligi kerak, aks holda har doim qayta render bo'ladi

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <>
      <div className="bg-slate-950 w-full min-h-screen text-white">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-4 bg-gradient-to-br from-slate-800 to-slate-950 text-white">
          <h1 className="text-2xl font-bold cursor-pointer">Logo</h1>
          {user && (
            <div className="flex items-center gap-3 md:gap-5">
              <img
                src={user.avatar}
                alt="User"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <h3 className="font-semibold hidden sm:block">{user.name.split(" ")[0]}</h3>
              <button
                className="px-3 py-1 bg-slate-700 rounded-full cursor-pointer text-sm md:text-base"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Search section */}
        <div className="flex items-center justify-center mt-24">
          <div className="flex flex-col items-center text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Hi Developer</h1>
            <form className="w-full">
              <div className="mt-5 w-full max-w-sm bg-slate-700 px-6 py-2.5 rounded-full border border-gray-400">
                <input
                  type="text"
                  placeholder="Search by tag name"
                  className="bg-transparent outline-none w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Posts section */}
        <div className="p-4 sm:p-6 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {PostFilters.map((post) => (
              <div
                key={post.id}
                className="flex flex-col items-center justify-between p-4 border border-gray-700 rounded-lg shadow-md bg-slate-800 hover:bg-slate-700 transition duration-300"
              >
                <img src={post.picture} alt="Post" className="w-full h-40 object-cover rounded-md" />
                <h3 className="font-semibold mt-3 text-lg">{post.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{post.description}</p>
                <button className="mt-4 px-4 py-2 text-sm border-2 border-gray-500 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300">
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
