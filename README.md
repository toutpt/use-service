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

Then you can follow the example at https://github.com/toutpt/use-service/tree/master/src/App.js

![example](https://raw.githubusercontent.com/toutpt/use-service/master/example.gif)

## API

### **registerService**(idOrFunction, func) -> undefined

you have two options:

```javascript
// foo.js
function $foo() {}

// app.js
registerService('$foo', $foo);
```

or

```javascript
// foo.js
function $foo() {}
$foo.id = '$foo';

// app.js
registerService($foo);
```

### **useService**(id, options) -> service instance

options.subscribe is set by default to true. In case performance are important you can set it to false if you know your component do not display the data of this service.

# How to use with typescript

In the following example we build a service able to fetch with abort API.
The state management is done by hand to show a real world example.

```typescript

export class $bar {
    public static $id = '$bar';
    public isLoading: boolean = true;
    public error: Error | null = null;
    private controller: AbortController | null = null;
    public data: any // up to you

    constructor(private $apply:any) {
    }

    private reset() {
        this.isLoading = true;
        this.error = null;
        this.$apply();
    }

    abort() {
        if (this.controller) {
            this.controller.abort();
        }
    }

    fetchMe(){
        this.reset();
        this.controller = new AbortController();
        return fetch('/api/bar', { signal: this.controller.signal }).then(data => {
            this.data = data;
        }).catch(e => {
            if (e.name !== 'AbortError') {
                this.error = e;
            }
        }).finally(() => {
            this.isLoading = false;
            this.$apply();
        });
    }
}
```

then, you can register and use it in your component

```typescript
import React, {useEffect} from 'react';
import { useService } from 'use-service';
// this is one of the main difference
import { $foo as FooService } from './foo.service.ts';

export function MyBar() {
    const $foo : FooService = useService('$foo');
    useEffect(() => {
        $foo.fetchMe();
        return () => $foo.abort();
    }, []);

    if ($foo.error) {
        return (
            <div className="alert alert-danger">
                <p>Could not load: {$foo.error.message}</p>
                <button className="btn btn-default" onClick={() => $foo.fetchMe()}>re try<button>
            </div>
        );
    }

    if ($foo.isLoading) {
        return "loading ... " // use your loading feedback component
    }

    return (
        <div className="foo">
            // display your $foo.data
        </div>
    );
}
```
