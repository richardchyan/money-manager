import React, { useState } from 'react'
import useSignup from '../hooks/useSignup';

const Signup = () => {
   
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { signup, pending, error } = useSignup();

   const handleSubmit = e => {
      e.preventDefault();
      signup(username, email, password);
      
   }

   return (
      <div>
         <form onSubmit={handleSubmit} className="max-w-md m-auto mt-8 px-3" >
            <h1 className="text-4xl font-poppins">Sign up</h1>
            <label>
               <span className="text-lg block text-left py-2">username:</span>
               <input 
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
               />
            </label>
            <label>
               <span className="text-lg block text-left py-2">email:</span>
               <input 
                  type="email"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
            </label>
            <label>
               <span className="text-lg block text-left py-2">password:</span>
               <input 
                  type="password"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
               />
            </label>
            { !pending && <button className="px-4 py-2 block text-left text-white bg-green-600 rounded-lg my-4">Sign up</button>}
            { pending && <button className="px-4 py-2 block text-left text-white bg-green-600 rounded-lg my-4" disabled>...Loading</button>}
            { error && <p className="text-2xl"> { error }</p>}
         </form>
      </div>
   )
}

export default Signup
