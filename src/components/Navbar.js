import React from 'react'
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';

const Navbar = () => {

   const { logout } = useLogout();
   const { user } = useAuthContext();


   return (
      <div className="bg-green-600">
         <nav className="flex flex-col md:flex-row py-6 px-4 justify-between max-w-screen-lg m-auto items-center">
            <Link to="/">
               <h1 className="font-bold text-white text-2xl mb-2 md:mb-0 md:text-5xl">Money Manager</h1>
            </Link>
            <div className="flex items-center space-x-8">
               {!user && (
                  <div className="flex space-x-2">
                     <Link to="/login">
                        <h2 className="text-md md:text-xl text-black rounded-lg py-1 px-2 md:py-2 md:px-4 bg-white">Login</h2>
                     </Link>
                     <Link to="/signup">
                        <h2 className="text-md md:text-xl text-black rounded-lg py-1 px-2 md:py-2 md:px-4 bg-white">Sign up</h2>
                     </Link>
                  </div>
               )}
               {user && (
                  <div className="flex flex-col md:flex-row items-center md:space-x-3">
                     <p className='text-lg md:text-3xl'>Hello, {user.displayName}</p>
                     <button className="text-sm md:text-xl text-black rounded-lg p-1 md:py-2 md:px-4 bg-white border-4 border-green-900" onClick={logout}>Log out</button>  
                  </div>
               )}
            </div>
         </nav>
      </div>
   )
}

export default Navbar
