import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function PrivateAdmin({ children }) {
  // cek user
  const user = useSelector((state) => state.user);
  if (user.isUserAvailable && user.userInfo.roles_id == "1") return children;

  return <Navigate to="/login" replace={true} />;
}

export default PrivateAdmin;
