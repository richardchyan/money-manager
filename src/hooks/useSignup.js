import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import useAuthContext  from './useAuthContext.js';


const useSignup = () => {

   const [error, setError]= useState(null);
   const [pending, setPending] = useState(false);
   const [cancelled, setCancelled] = useState(false);
   const { dispatch } = useAuthContext();

   const signup = async(username, email, password) => {
      setError(null);
      setPending(true);

      try {
         const response = await auth.createUserWithEmailAndPassword(email, password);
         console.log(response.user); // the response has a user property which is the user created after passing in the args
         
         if(!response){
            throw new Error('signup could not be completed')
         }

         // Firebase doesn't allow creating user object iwth username directly, you'll have to add it to the user object afterwards by the updateprofile() method

         await response.user.updateProfile({ displayName: username})

         // dispatch the login action now, so that the user is automatically logged in after signup up 
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
         }
      }

   }

   useEffect(() => {
      return () => setCancelled(true);

   }, [])

   return { error, pending, signup}

}

export default useSignup;
