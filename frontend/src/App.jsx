import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Auth from './pages/Auth';
import PraviteRoute from './api/PraviteRoute'
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<PraviteRoute element={<Home/>} />} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App