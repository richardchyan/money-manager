import React, { useState } from 'react'
import useLogin from '../hooks/useLogin';

const Login = () => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login, error, pending} = useLogin();

   const handleSubmit = e => {
      e.preventDefault();
      login(email, password);
   }

   return (
      <div>
         <form onSubmit={handleSubmit} className="max-w-md m-auto mt-8 px-3" >
            <h1 className="text-4xl font-poppins">Login</h1>
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
            { !pending && <button className="px-4 py-2 block text-left text-white bg-green-600 rounded-lg my-4">Login</button>}
            { pending && <button className="px-4 py-2 block text-left text-white bg-green-600 rounded-lg my-4" disabled>... Loading</button>}
            { error && <p className="text-3xl"> {error}</p>}
            
         </form>
      </div>
   )
}

export default Login
