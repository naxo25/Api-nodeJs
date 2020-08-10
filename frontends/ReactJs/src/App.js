import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mycomponente from './form/Mycomponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <Mycomponente/>

      </header>
    </div>
  );
};

export default App;
