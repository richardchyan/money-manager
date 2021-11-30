import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';


// use this as a "GET" hook for each collection being called. This is why using the onsnapshot is used instead of a regular get, because it is real-time by default
const useCollection = (collection, _query, _orderBy) => {

   const [documents, setDocuments] = useState(null);
   const [error, setError] = useState(null);

   // If you don't use a ref, there will be an infinite loop. Once collection changes, documents change which causes home to re-render. One home re-renders, the txhen the default query array in the hook on home is "recreated" which causes query in useCollection to re-render, which re-renders home, which causes an infinite loop
   // storing query in a useRef hook that indirectly calls the "current value" of the _query reference argument will stop the infinite loop because the _query array is "different" on every function call
   const query = useRef(_query).current;
   const orderBy = useRef(_orderBy).current;

   useEffect(() => {
      let ref = db.collection(collection)
      // let ref = db.collection(collection).orderBy('createdAt', 'desc');

      if(query){
         ref = ref.where(...query);
      };

      if(orderBy){
         ref = ref.orderBy(...orderBy);
      };

      const unsubscribe = ref.onSnapshot(snapshot => {
         let results = [];
         snapshot.docs.map(doc => {
            results.push({ ...doc.data(), id: doc.id })
         });
         // Update date
         setDocuments(results);
         setError(null);
         
      }, (error) => {
         console.log(error);
         setError('could not fetch data')
      })

      return () => unsubscribe();
   }, [collection, query, orderBy])

   return { documents, error };

}

export default useCollection
