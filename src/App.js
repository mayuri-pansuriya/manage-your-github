import React, { useState } from 'react';
import Login from './component/Login';
import ApolloProv from './component/AllRepos';
import './App.css';

const App = () => {
  const [accessToken, setAccesstoken] = useState(localStorage.getItem("access_token"));

  return (!accessToken)
    ? <Login setAccesstoken={setAccesstoken} />
    : <ApolloProv accessToken={accessToken} />
}

export default App;
