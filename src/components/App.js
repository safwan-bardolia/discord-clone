import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import {login, logout} from '../features/userSlice'
import { clearChannelInfo } from '../features/appSlice';

function App() {
  
  // to dispatch the action
  const dispatch = useDispatch(); 

  // get userId from userSlice using useSelector Hooks
  const user = useSelector(selectUser);

  useEffect(()=>{
    // every time user-authentication status changed  listen it
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // if user is present then dispatch the login action
        // means when we do 'auth.signIn()'
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        // dispatch logout action
        // means when we do 'auth.signOut()'
        dispatch(logout());

        // dispatch clearChannelInfo() to clear state.app data
        dispatch(clearChannelInfo());
      }
    })
  },[dispatch])   // dispatch is dependency without this it will show a warning in terminal

  return (
    <div className="app">
      {/* if user is present then render rest of the app otherwise display Login component */}
      {user ?(
        <>
          <Sidebar/>
          <Chat/>
        </>  
      ):(
        <Login/>
      )}
    </div>
  );
}

export default App;
