# useService react hook

React hook to handle a shared service accross multiple components.

By `service` we point an instance of a user-defined object using the `new` operator.

A service may hold a state. That state will be shared to your components.
That means your components will be udpated if the service `notify` it has been updated.

## Getting started

just add `use-service` addon to your project:

```
npm i use-service
```

Then in your source code create the following files

```javascript
// countService.js file
import { registerService } from 'use-service';

function countService(notify) {
  this.count = 0;
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
```

```javascript
// components/CountControl
import React from 'react';
import { useService } from 'use-service';

function CountControl() {
  const countService = useService('countService');

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

```

```javascript
// components/Count
import React from 'react';
import { useService } from 'use-service';

function Count() {
  const countService = useService('countService');

  return <p>{countService.count}</p>;
}
```

Then you can have as many instances of those components they share the same service instance.

![example](https://raw.githubusercontent.com/toutpt/use-service/master/example.gif)