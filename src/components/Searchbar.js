import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


const Searchbar = () => {

   const [term, setTerm] = useState('');
   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();
      setTerm('');
      history.push(`/search?q=${term}`);
   }

   return (
      <div className="px-4">
         {/* Search Bar */}
         <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="text-white text-lg mr-4" >Search:</label>
            <input 
               type="text"
               id="search" 
               onChange={e => setTerm(e.target.value)}
               value={term}
               className="bordergray-300 shadow-lg p-2 rounded-lg"
               required   
            />
         </form>
      </div>
   )
}

export default Searchbar;
