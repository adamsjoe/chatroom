import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Chatroom() {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [localMessages, setLocalMessages] = useState([]);

  const firestore = firebase.firestore();
  useEffect(async () => {
    setUserId(firebase.auth()?.currentUser?.uid);
    const query = firestore.collection('chats').orderBy('timestamp', 'asc');
    query.onSnapshot({
      next: (querySnapshot) => {
        // eslint-disable-next-line prefer-const
        let messages = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          messages.push(doc.data());
        });
        setLocalMessages(messages);
      },
    });
  }, []);

  return (
    <div>
      <div style={{
        display: 'flex',
        flex: 1,
        height: '100vh',
        flexDirection: 'column'}}>
        <div style={{
          flex: 1,
          marginLeft: 24,
          marginRight: 24,
          overflow: 'auto',
          marginBottom: 24}}>
          {localMessages.map((localMessage) => (
            // lint fail here - interesting
            // eslint-disable-next-line react/jsx-key
            <div style={{
              display: 'flex',
              flex: 1,
              justifyContent:
              userId === localMessage.uid ? 'flex-end' : 'flex-start'}}>
              <div style={{
                minHeight: 52,
                width: 600,
                backgroundColor: userId === localMessage.uid ? 'blue' : 'red',
                color: 'white',
                paddingLeft: 24,
                fontWeight: 'bold',
                marginTop: 24,
                marginLeft: 24,
                marginRight: 24,
                borderRadius: 12}}>
                <p>{localMessage.content}</p>
              </div>
            </div>),
          )}
        </div>
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 24}}>
          <input style={{
            flex: 11,
            height: 32,
            fontSize: 28,
          }} type='text' value={text} onChange={(value) => {
            setText(value.target.value);
          }}/>
          <button style={{
            flex: 1,
            backgroundColor: 'blue',
            colour: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            borderWidth: 0,
          }} onClick={() => {
            const timestamp = Date.now();
            const content = text;
            const uid = userId;
            const message = {content, timestamp, uid};
            firestore.collection('chats').add(message)
                .then((docRef) => {
                  console.log('Document written with IDL ', docRef.id);
                })
                .catch((errror) => {
                  console.error('Error adding document: ', error);
                });
          }}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
