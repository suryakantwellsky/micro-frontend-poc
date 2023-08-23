import React, { useEffect, useState } from 'react';
import { load } from 'web-component-load';

import './App.scss';

function App() {
  const [reactInputValue, setReactInputValue] = useState('');
  const [angularInputValue, setAngularInputValue] = useState('');

  useEffect(() => {
    // use of this imports will import 'vendor.js', 'polyfills.js', 'main.js', 'runtime.js', 'styles.js', and 'styles.css'
    load('http://localhost:4200');
  }, []);

  document.addEventListener('angular-input-event', function (e) {
    setAngularInputValue(e.detail);
  }, { capture: true });

  return (
    <div className="app">
      <div><b>Container App - React App</b></div>
      <div style={{border:'1px solid grey', padding:'15px', marginTop:'10px'}}>
      <div>Value from Micro Frontend Angular App Component: {angularInputValue}</div>
      <div>
        <label>Enter value : </label>
        <input
          onChange={(e) => setReactInputValue(e.target.value)}
          value={reactInputValue}
        />
      </div>
      </div>
      <div style={{ marginTop:'100px' }}><angular-component react-value={reactInputValue} /></div>
    </div>
  )
}

export default App;