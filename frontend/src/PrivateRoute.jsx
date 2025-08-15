import { Navigate } from "react-router-dom";
import { useStoredContext } from "./contextApi/ContextApi";

export default function PrivateRoute ({children, publicPage}){
    const {token} =useStoredContext();

    if(publicPage){
        return token ? <Navigate to="/dashboard"/> : children;

    }
    return !token ? <Navigate to="/login"/> : children ;
}