import { useEffect, useState } from 'react';

const factories = {};  // hold a function service
const services = {};  // hold an instance of a function service
const notifies = {};  // hold setState of component which use a service

export function useService(id) {
  const [, setState] = useState(services[id]);
  useEffect(() => {
    return function cleanup() {
      // console.log('remove setState of the unmounted component');
      const index = notifies[id].indexOf(setState);
      if (index !== -1) {
        notifies[id].splice(index, 1);
      }
    };
  }, []);
  if (!services[id]) {
    // this will call every setState to update each components
    const notify = () => {
      notifies[id].forEach(callMe => callMe(services[id]));
    };
    services[id] = new factories[id](notify);
    notifies[id] = [setState];
  } else if (notifies[id].indexOf(setState) === -1)  {
    // console.log('subscribe to service');
    notifies[id].push(setState);
  }
  return services[id];
}

export function registerService(key, value) {
  if (factories[key] === value) {
    throw new Error(`The service ${key} is already registred`);
  } else if (factories[key]) {
    throw new Error(`A service is already registred under the key ${key}`);
  } else {
    factories[key] = value;
  }
}
