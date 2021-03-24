import { readable } from 'svelte/store';
import { subscribe, is_function, noop, run_all } from 'svelte/internal';

// changed svelte derived store to return cleanup info 
export function vcDerived(stores, _callback, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = (single)
    ? [stores]
    : stores;

  // args length = 1: _callback, = 2: _callback + async set   
  const auto = _callback.length < 2;

  // utility function to get the pending bitmap as a string
  const getBitString = (pending) => {
    let bitString = '';
    for (let i = 0; i < stores_array.length; i++) {
      // use a bitmask to test a pending bit 
      bitString += (pending & (1 << i)) ? '1' : '0';
    }
    return bitString;
  }

  // derived uses a readable store which derives from one or more other stores
  return readable(initial_value, set => {
    // start by pulling all the current values of the stores
    let inited = false;

    const values = [];  // store values
    let fired = null;   // fired stores index or null = stop
    let pending = 0;
    let cleanup = noop;

    // sync stores to derive the result
    const sync = () => {
      // serialize handling of mapped stores
      if (pending) return;

      // cleanup() :If you return a function from the callback, it will be called when:
      // a) just before the callback runs again, or b) the last subscriber unsubscribes.
      cleanup(fired); // pass fired !!
      const result = _callback((single)  // derived callback 
        ? values[0]
        : values, set
      )

      // sync: no return cleanup function call
      if (auto) set(result);
      else cleanup = (is_function(result))  // async set 
        ? result
        : noop;
    }

    // subscribe to the stores (map) and sync the result
    const unsubscribers = stores_array.map((store, i) => subscribe(
      // inited false : get the current values  
      // inited = true : changed store values will be synced 
      store,
      value => {
        values[i] = value;
        fired = i;
        // console.log('fired', getBitString(pending))
        pending &= ~(1 << i); // reset pending bit [i]
        if (inited) sync();
      },
      // the second callback will run first when inited = true and auto = false (async set)  
      // the second callback will not run when inited = false or auto = true 
      () => {
        fired = i;
        // the second callback runs before the callback to enter the store pending state
        pending |= (1 << i);
      }
    ));

    // now we will obeserve store updates
    inited = true;
    sync(); // merge updates into the current values

    return function stop() {
      run_all(unsubscribers);
      cleanup(null); // pass fired: stop !! 
    };
  });
}
