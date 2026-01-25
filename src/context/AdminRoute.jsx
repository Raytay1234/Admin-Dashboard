import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AdminRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
