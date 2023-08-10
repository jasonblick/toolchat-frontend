// src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
          setSession(session);
          console.log(session.access_token);
      } else {
          console.log("Retrieved session is null.");
      }
    });
  
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setSession(null);
      navigate('/home');  // <-- Add this line
    }
  };

  return (
    <AuthContext.Provider value={{ session, supabase, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
