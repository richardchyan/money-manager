import React from 'react'
import TransactionForm from './TransactionForm'
import useAuthContext from '../../hooks/useAuthContext'
import useCollection from '../../hooks/useCollection';
import TransactionsList from './TransactionsList';

const Home = () => {

   const { user } = useAuthContext();
   const { documents, error } = useCollection(
      'transactions', 
      ["uid", "==", user.uid], 
      ['createdAt', 'desc']
   );

   // 

   return (
      <div className="grid grid-cols-3 max-w-screen-lg m-auto my-6 gap-x-8">
         <div className="col-span-2">
            {error && <p> {error} </p>}
            {documents && <TransactionsList transactions={documents} />}
         </div>
         <div className="col-span-1">
            <TransactionForm uid={user.uid} />
         </div>
      </div>
   )
}

export default Home
