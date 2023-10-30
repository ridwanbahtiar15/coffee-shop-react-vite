import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function PrivateUser({ children }) {
  // cek user
  const user = useSelector((state) => state.user);
  if (user.isUserAvailable) return children;

  return <Navigate to="/login" replace={true} />;
}

export default PrivateUser;
