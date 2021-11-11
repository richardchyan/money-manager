import React, { useState, useEffect } from 'react';
import useFirestore from '../../hooks/useFirestore';

const TransactionForm = ({ uid }) => {

   const [name, setName] = useState('');
   const [amount, setAmount] = useState('');
   const { addDocument, response } = useFirestore('transactions');


   const handleSubmit = e => {
      e.preventDefault();
      const transaction = {
         uid, name, amount
      }
      // console.log(transaction);
      addDocument(transaction);
   }

   useEffect(() => {
      if(response.success){
         setName('');
         setAmount('');
      }
   
   }, [response.success])
   
   return (
      <>
         <h3 className="text-xl text-left p-2 bg-green-600 text-white rounded-t-lg">Add a Transaction here</h3>
         <form onSubmit={handleSubmit} className="p-2 bg-green-600 rounded-b-lg">
            <label className="block text-left py-2">
               <span className="text-white">Transaction name:</span>
               <input 
                  type="text"
                  required
                  onChange={e => setName(e.target.value)}
                  value={name}
                  className="w-full p-2 rounded-lg"
               />
            </label>
            <label className="block text-left py-2">
               <span className="text-white"> Amount ($):</span>
               <input 
                  type="number"
                  required
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                  className="w-full p-2 rounded-lg"
               />
            </label>
            <button className="text-lg rounded-lg border-2 border-white text-white bg-green-600 hover:bg-green-400 px-2 py-1" >Add Transaction</button>
         </form>
      </>
   )
}

export default TransactionForm
