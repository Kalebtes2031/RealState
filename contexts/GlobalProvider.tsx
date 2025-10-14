import { View, Text } from 'react-native'
import React, { createContext, useContext, ReactNode, useState } from 'react'
import type { User } from '@/types/User';



interface GlobalContextType {
    user: User | null;
    isLogged: boolean;
    loading: boolean;
    refetch: () => void;

}

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


const GlobalProvider = ({children}: GlobalProviderProps) => {
    
    const [loading,setLoading] = useState(true);
    const [ user, setUser] = useState(null);
    
    const refetch = ()=>{
        console.log(user)
        console.log(setUser)
        console.log(setLoading)
    }
    
    const isLogged = !!user

    return (
    <GlobalContext.Provider
        value={{
            isLogged,
            user,
            loading,
            refetch,
        }}
    >
        {children}
    </GlobalContext.Provider>
  )
}



export default GlobalProvider