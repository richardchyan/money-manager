import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import useAuthContext  from './useAuthContext.js';

const useLogout = () => {

   const [error, setError]= useState(null);
   const [pending, setPending] = useState(false);
   const [cancelled, setCancelled] = useState(false);
   const { dispatch } = useAuthContext();

   const logout = async () => {

      setError(null);
      setPending(true);

      // log the user out
      try {
         // log the user out with the signout method on the auth object
         await auth.signOut();
         // then dispatch the action and update the state
         // don't have to return payload, because in the reducer you are just passing in null for the user
         dispatch({ type: 'LOGOUT'});
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

   // Clean up function to make sure no error occurs if you click away quickly during an async function while it's trying to update state
   // set the cancelled setter to true immediately, so that if you navigate away while component is trying to update state, you use the truthy cancelled state in an if statement to prevent other state from updating
   useEffect(() => {
      return () => setCancelled(true);

   }, [])

   return { logout, error, pending};

}

export default useLogout;

