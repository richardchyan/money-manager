import React from 'react'
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';

const Navbar = () => {

   const { logout } = useLogout();
   const { user } = useAuthContext();


   return (
      <div className="bg-green-600">
         <nav className="flex py-6 px-4 justify-between max-w-screen-lg m-auto items-center">
            <Link to="/">
               <h1 className="font-bold text-white text-5xl">Money Manager</h1>
            </Link>
            <div className="flex items-center space-x-8">
               {!user && (
                  <>
                     <Link to="/login">
                        <h2 className="text-xl font-poppins text-black rounded-lg py-2 px-4 bg-white">Login</h2>
                     </Link>
                     <Link to="/signup">
                        <h2 className="text-xl font-poppins text-black rounded-lg py-2 px-4 bg-white">Sign up</h2>
                     </Link>
                  </>
                  
               )}
               {user && (
                  <>
                     <p className='text-3xl'>Hello, {user.displayName}</p>
                     <button className="text-xl font-poppins text-black rounded-lg py-2 px-4 bg-white border-4 border-green-900" onClick={logout}>Log out</button>  
                  </>
               )}
               
            </div>
         </nav>
      </div>
   )
}

export default Navbar
