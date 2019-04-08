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
