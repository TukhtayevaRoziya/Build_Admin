import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const { token } = useSelector((state) => state.authReducer);

  if (token) return children;
  else return <Navigate to="/" />;
};

export default PrivateRoute;
