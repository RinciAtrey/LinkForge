import { createContext, useState, useContext } from "react";

const ContextApi= createContext();

export const ContextProvider= ({children})=>{
    const getToken= localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

    const [token, setToken]= useState(getToken);

    //Data shared across the application
    const sendData= {
        token,
        setToken
    }

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};

export const useStoredContext=()=>{
    const context =useContext(ContextApi);
    return context;
}