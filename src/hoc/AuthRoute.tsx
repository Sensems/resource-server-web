import { FunctionComponent, useEffect } from "react";
import { useSelector } from 'react-redux'
import { API } from "../common/api/api.d";
import { checkLogin } from "../common/api/api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthRoute: FunctionComponent<any> = ({ children }: any) => {

  const navigate = useNavigate();
  const userInfo = useSelector<{}, API.Response.UserInfo>((state: any) => state.user.userInfo);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') return
    checkLogin().then(res => {
      if (!res.data) navigate('/login', { replace: true })
    })
  }, [location])

  if (userInfo.username !== '' || location.pathname === '/login') {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}

export default AuthRoute;