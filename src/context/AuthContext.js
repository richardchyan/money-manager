import { createContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/config';

const AuthContext = createContext();

const authReducer = (state, action) => {

   switch(action.type){
      case 'LOGIN' :
         return { ...state, user: action.payload}
      case 'LOGOUT':
         return { ...state, user: null};
      case 'AUTH_IS_READY':
         return { ...state, user: action.payload, authIsReady: true};
      default: 
         return state;
   }

}

const AuthProvider = ({ children }) => {

   const [state, dispatch] = useReducer(authReducer, { 
      user: null,
      authIsReady: false,
   });

   useEffect(() => {
      const unsub = auth.onAuthStateChanged((user) => {
         // like onsnapshot, onAuthStateChange method will keep listening for state changes, so store it in a constant and then invoke the unsubscription function to only check for user state once during the initial check
         dispatch({type: 'AUTH_IS_READY', payload: user});
         unsub();
      })

   },[]);

   console.log('AuthContext state:', state);

   return (
      <AuthContext.Provider value={{ ...state, dispatch}}>
         { children }
      </AuthContext.Provider>
   )

}

export { AuthContext, AuthProvider } ;