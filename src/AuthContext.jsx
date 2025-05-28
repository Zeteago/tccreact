import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    let authListener = null;

    // Checa a sessão inicial e configura o listener de autenticação
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      //Inicia o listener de autenticação
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null);
          // Se a sessão for nula, significa que o usuário saiu
          setLoading(false); 
        }
      );
      authListener = data;

    }).catch(error => {
        console.error("Error getting initial session:", error);
        setLoading(false);
    });

    // limpeza do listener de autenticação
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []); 

  const signUp = (data) => {
    return supabase.auth.signUp(data);
  };

  const signIn = (data) => {
    return supabase.auth.signInWithPassword(data);
  };

  const signOut = () => {
    return supabase.auth.signOut();
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    // Return loading state, considering bypass mode is instantly loaded
    loading: loading 
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only when not loading OR in bypass mode */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
