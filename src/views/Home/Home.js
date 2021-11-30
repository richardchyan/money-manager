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
 
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-lg m-auto my-6 px-4 gap-x-8">
         <div className="md:col-span-2">
            {error && <p> {error} </p>}
            {documents && <h1 class="text-2xl md:text-3xl mb-2 text-right">Total Spent: ${documents.reduce((prevTotal, item) => (+prevTotal + +item.amount), 0 )} </h1> }
            {/* second paramter of reduce also takes a named item just like foreach or map */}
            {documents && <TransactionsList transactions={documents} />}
         </div>
         <div className="order-first md:order-last mb-4 md:col-span-1">
            <TransactionForm uid={user.uid} />
         </div>
      </div>
   )
}

export default Home
