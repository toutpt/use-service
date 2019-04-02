import { useEffect, useState } from 'react';

const factories = new Map();  // hold a function service
const services = new Map();  // hold an instance of a function service
const notifies = new Map();  // hold setState of component which use a service

function initService(id) {
  let instance = services.get(id);
  if (!instance) {
    const notify = () => {
      (notifies.get(id) || []).forEach(callMe => callMe(Object.assign({}, services.get(id))));
    };
    // this will call every setState to update each components
    const factory = factories.get(id);
    instance = new factory.fn(notify, ...factory.dependencies.map(initService));
    services.set(id, instance);
  }
  return instance;
}

/**
 * useService let you get instance of a registred service
 * @param {string} id - the id of the service you want to get
 * @param {Object} options - to configure the behavior you want
 * @param {boolean} options.subscribe - set to false to not be notified of updates
 */
export function useService(id, options = { subscribe: true }) {
  const [, setState] = useState(services.get(id));
  useEffect(() => {
    return function cleanup() {
      if (notifies.get(id).has(setState)) {
        notifies.get(id).delete(setState);
      }
    };
  }, []);
  if (options.subscribe) {
    if (notifies.get(id) === undefined) {
      notifies.set(id, new Set([setState]));
    } else if (!notifies.get(id).has(setState))  {
      notifies.get(id).add(setState);
    }
  }
  return initService(id);
}

/**
 * registerService let you register a function and map it to an id.
 * @param {string|function} idOrFn - the id of the service you want to get or the function constructor identifed
 * @param {function} value - the function constructor of the service
 */
export function registerService(idOrFn, value) {
  let id = idOrFn;
  let fn = value;
  if (!value) {
    id = idOrFn.$id;
    fn = idOrFn;
  }
  if (factories.get(id)) {
    throw new Error(`A service is already registred under the key ${id}`);
  } else {
    factories.set(id, {
      fn,
      dependencies: fn.dependencies || [],
    });
  }
}


/**
 * low level use of service (in case you are not in a component)
 * @param {string} id - the id of the service you want
 */
export function getService(id) {
  return services.get(id);
}
