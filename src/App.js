import React, { useState } from 'react';
import { registerService, useService } from './useService';

// services/log.js
function $log() {
  this.info = (...args) => console.info(...args);
}
$log.$id = '$log';

// services/count.js
function $count(notify, $log) {
  this.count = 0;
  $log.info('create service#$count should be called only once');
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
$count.$id = 'count';
$count.dependencies = ['$log'];


// index.js
registerService('$log', $log);
registerService('$count', $count);

// components/Counter
function Counter(props) {
  const $count = useService('$count');
  console.log('Counter.render()', props.id);
  
  return (
      <p id={props.id}>Count state value({props.id}): {$count.count}</p>
  );
}

// components/CountController
function CountController(props) {
  const $count = useService('$count');
  console.log('CountController.render()');
  
  return (
    <div>
      <button onClick={() => $count.increment()}>
        +
      </button>
      <button onClick={() => $count.decrement()}>
        -
      </button>
    </div>
  );
}

// App.js
function App() {
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
