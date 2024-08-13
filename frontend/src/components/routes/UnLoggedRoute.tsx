import { Navigate, Outlet } from "react-router-dom";

function UnLoggedRoute() {
  const localUser = localStorage.getItem("userData");
  let user = null;

  if (localUser) {
    user = JSON.parse(localUser);
  }
  return user ? <Navigate to="/" replace /> : <Outlet />
}

export default UnLoggedRoute