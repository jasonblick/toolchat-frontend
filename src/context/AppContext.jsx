// src\context\AppContext.jsx

import { createContext, useState, useContext } from 'react';
import { Session } from '../classes/Session';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [activeSession, setActiveSession] = useState(null);

    // Log active session for debugging
    console.log('Active Session:', activeSession);

    return (
        <AppContext.Provider value={{ activeSession, setActiveSession }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
