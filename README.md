# useService react hook

> ⚠️ Warning: hooks are not part of a stable React release yet, so use this library only for experiments ⚠️

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
import { useService } from 'use-service';

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
useService.add('countService', countService);
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

![example](./example.gif)