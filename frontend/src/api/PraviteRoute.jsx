import {Navigate} from 'react-router-dom'
const PraviteRoute = ({element}) => {
    const token=localStorage.getItem('accessToken');
  return token ? element : <Navigate to={'/auth'} />
}

export default PraviteRoute