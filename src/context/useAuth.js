import { useContext } from "react";
import { AuthContext } from "./AuthContextValue.js"; // make sure AuthContext is exported

export const useAuth = () => useContext(AuthContext);