import React from 'react'
import useFirestore from '../../hooks/useFirestore';
import trashcan from './assets/trash.svg';

const TransactionsList = ({ transactions }) => {

   const { deleteDocument, response } = useFirestore('transactions');
   
   console.log(response);

   return (
      <div className="">
         {transactions.map(transaction => (
            <li key={transaction.id} className="border-l-4 border-green-600 shadow-lg mb-4 list-none flex justify-between py-4 px-8 bg-green-50 relative">
               <p className="text-2xl">{transaction.name}</p>
               <p className="text-3xl">${transaction.amount}</p>
               <button onClick={() => deleteDocument(transaction.id)} className="text-md absolute top-1 right-1">
                  <img src={trashcan} alt="delete" />
               </button>
            </li>
         ))}
      </div>
   )
}

export default TransactionsList
