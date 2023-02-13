import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';

const RequiredLogin = ({allowRole}) => {
    const location = useLocation();
    const {user,isLoading,isSuccess}=useSelector(state=>state.auth)


  return (
    <>
  {(allowRole===user?.getUserType) ?<Outlet />:isLoading && <p>Loading</p>}
  {!user && !isLoading && !isSuccess && <Navigate to='/login' state={{from:location}} replace />} 
 
  </>
  )
}

export default RequiredLogin