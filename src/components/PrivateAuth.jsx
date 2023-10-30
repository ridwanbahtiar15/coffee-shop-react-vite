import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function PrivateAuth({ children }) {
  const user = useSelector((state) => state.user);
  if (!user.isUserAvailable) return children;

  return <Navigate to="/" replace={true} />;
}

export default PrivateAuth;
