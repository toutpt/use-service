import { useEffect, useState } from 'react';

const factories = new Map();  // hold a function service
const services = new Map();  // hold an instance of a function service
const notifies = new Map();  // hold setState of component which use a service

export function useService(id) {
  const [, setState] = useState(services.get(id));
  useEffect(() => {
    return function cleanup() {
      console.log('remove setState of the unmounted component');
      if (notifies.get(id).has(setState)) {
        notifies.get(id).delete(setState);
      }
    };
  }, []);
  if (!services.get(id)) {
    const notify = () => {
      notifies.get(id).forEach(callMe => callMe(Object.assign({}, services.get(id))));
    };
    // this will call every setState to update each components
    const fn = factories.get(id);
    services.set(id, new fn(notify));
    notifies.set(id, new Set([setState]));
  } else if (!notifies.get(id).has(setState))  {
    console.log('subscribe to service');
    notifies.get(id).add(setState);
  }
  return services.get(id);
}

export function registerService(key, value) {
  if (factories.get(key) === value) {
    throw new Error(`The service ${key} is already registred`);
  } else if (factories.get(key)) {
    throw new Error(`A service is already registred under the key ${key}`);
  } else {
    factories.set(key, value);
  }
}
