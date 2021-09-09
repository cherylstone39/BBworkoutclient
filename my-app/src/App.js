import React, { useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Sitebar from './home/Navbar';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState(''); //1

  useEffect(() => {//2
  if (localStorage.getItem('token')){
    setSessionToken(localStorage.getItem('token'));
  }
}, [])

const updateToken = (newToken) => { //3
localStorage.setItem('token', newToken);
setSessionToken(newToken);
console.log(sessionToken);
}

const clearToken = () => {
  localStorage.clear();
  setSessionToken('');
}
const protectedView = () => {
  return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/>
  : <Auth updateToken={updateToken}/>)
}
//render method is down here
  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedView()} 
    </div>
  );
}

export default App;
