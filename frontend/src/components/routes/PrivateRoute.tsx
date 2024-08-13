import { USER_ROLE } from '../../interfaces/user'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ roles }: { roles: USER_ROLE[] }) {
  const localUser = localStorage.getItem("userData");
  let user = null;

  if (localUser) {
    user = JSON.parse(localUser);
  }

  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
  console.log(user, roles)

  if (user) {
    if (userHasRequiredRole) {
      return <Outlet />;
    } else {
      return <Navigate to="/forbidden" replace />
    }
  } else {
    return <Navigate to="/login" replace />
  }
}

export default PrivateRoute