import React, { useState } from 'react';
import { registerService, useService } from './useService';

function countService(notify) {
  this.count = 0;
  console.log('create service#countService should be called only once');
  this.increment = () => {
    this.count += 1;
    notify();
  };
  this.decrement = () => {
    this.count -= 1;
    notify();
  };
  return this;
}

registerService('countService', countService);

function Counter(props) {
  const countService = useService('countService');
  console.log('Counter.render()', props.id);
  
  return (
      <p id={props.id}>Count state value({props.id}): {countService.count}</p>
  );
}

function CountController(props) {
  const countService = useService('countService');
  console.log('CountController.render()');
  
  return (
    <div>
      <button onClick={() => countService.increment()}>
        +
      </button>
      <button onClick={() => countService.decrement()}>
        -
      </button>
    </div>
  );
}

function App(props) {
  console.log('App.render');
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      React.version = "{React.version}"
      <Counter id="first" />
      <CountController />
      {show && (
        <Counter id="second" />
      )}
      <button onClick={() => setShow(!show)}>
        Toggle second Counter instance
      </button>
    </div>
  );
}

export default App;
