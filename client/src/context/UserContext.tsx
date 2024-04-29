import { createContext, useState } from "react";

export const UserContext = createContext<UserLoggedInState | null>(null);

type UserContextProps = {
 children: React.ReactNode
}

type UserLoggedInState = {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
export function UserContextProvider({children}: UserContextProps) {
    const [isLoggedIn, setIsLoggedIn]= useState(false);
    return <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </UserContext.Provider>
}
