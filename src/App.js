import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Chatroom from './components/Chatroom';
import {
  Routes, 
  Route,
  BrowserRouter as Router, 
  Navigate
} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function PrivateRoute({ component: Component, authenticated, ...rest}) {
  return (
      <Route 
        {...rest} 
        render={props => 
          authenticated === true ? (
            <Component {...props} />
          ) : (
            <Navigate 
              to={{ pathname: "/", state: {from: props.location} }} 
            />
          )
        } 
      />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest}) {
  return (
      <Route 
        {...rest} 
        render={props => 
          authenticated === false ? (
            <Component {...props} />
          ) : (
            <Navigate to="chatroom" />
          )
        } 
      />
  )
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Authenticated", authenticated)
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    })
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {authenticated ? 
            <Route path='/chatroom' 
              authenticated={authenticated} 
              element={<Chatroom />} 
            /> 
          : 
          <Route path='/' 
            authenticated={authenticated} 
            element={<Login />} 
          />
          }          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
