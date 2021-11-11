import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import useAuthContext  from './useAuthContext.js';

const useLogin = () => {

   const [error, setError]= useState(null);
   const [pending, setPending] = useState(false);
   const [cancelled, setCancelled] = useState(false);
   const { dispatch } = useAuthContext();

   const login = async (email, password) => {

      setError(null);
      setPending(true);
      
      try {
         const response = await auth.signInWithEmailAndPassword(email, password);

         dispatch({ type: 'LOGIN', payload: response.user});
         if(!cancelled){
            setPending(false);
            setError(null);
         }
      } catch (error) {
         if(!cancelled){
            console.log(error.message);
            setError(error.message);
            setPending(false);   
         }}
   }
   // Clean up function 
   useEffect(() => {
      return () => setCancelled(true);

   }, [])

   return { login, error, pending};

}

export default useLogin;

