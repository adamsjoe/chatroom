import React, {useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Chatroom() {
  const firestore = firebase.firestore();
  useEffect(async () => {
    const snapshot = await firestore.collection(`chats`).get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  }, []);

  return (
    <div>
      <h1>Chatroom</h1>
    </div>
  );
}

export default Chatroom;
