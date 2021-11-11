import { useReducer, useEffect, useState } from 'react';
import { db, timestamp } from '../firebase/config';

let initialState = {
   document: null,
   pending: false,
   error: null,
   success: null
}

const firestoreReducer = (state, action) => {
   switch(action.type){
      case 'IS_PENDING':
         return { pending: true, document: null, success: false, error: null }
      case 'ADD_DOCUMENT':
         return { pending: false, document: action.payload, success: true, error: null }
      case 'DELETE_DOCUMENT':
         return { pending: false, document: null, success: true, error: null }
      case 'ERROR':
         return { pending: false, document: null, success: false, error: action.payload }
      default: 
         return state;
   }
}

const useFirestore = (collection) => {

   const [response, dispatch] = useReducer(firestoreReducer, initialState);
   const [cancelled, setCancelled] = useState(false);

   // Collection reference
   const ref = db.collection(collection);
   // then you would just invoke the ref function after
   // like ref.add(collectionName)

   // only dispatch if not cancelled
   const dispatchIfNotCancelled = (action) => {
      if(!cancelled){
         dispatch(action);
      }
   }
 
   // add a document
   const addDocument = async (doc) => {

      dispatch({ type: 'IS_PENDING'});
      try {
         const createdAt = timestamp.fromDate(new Date());
         const addedDocument = await ref.add({ ...doc, createdAt});
         dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addedDocument})
      } catch (error) {
         dispatchIfNotCancelled({ type: 'ERROR', payload: error.message})
      }
   } 

   // delete a document

   const deleteDocument = async (id) => {
      dispatch({action: 'IS_PENDING'})

      try {
         await ref.doc(id).delete();

         dispatchIfNotCancelled({ type: 'DELETE'}) 
      } catch (error) {
         dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
      }
   }

   useEffect(()=> {
      return() => setCancelled(true);
   }, [])

   return { addDocument, deleteDocument, response };

}

export default useFirestore;