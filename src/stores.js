import { derived, writable } from 'svelte/store';
import { vcDerived } from './vcDerived.js';
import { query } from './query.js';
import { subscribe } from 'svelte/internal';

// stores to build the stream query
export const from = writable([0, null]);
export const delta = writable(1); // counter interval in seconds 

let unsubscribe = null;
let qry = null;
let fired = null;

export const stream = vcDerived([from, delta], ([$from, $delta], set) => {
  if (unsubscribe === null) {
    console.log('callback: query and subscribe counter stream, fired:', fired);
    // initialize qry object
    qry = query($from[0], $delta);
    unsubscribe = qry.subscribe(set);
  } else {
    console.log('callback: query update counter stream delta', $delta, 'fired:', fired);
    qry.delta = $delta;
  }
  // cleanup / stop
  return (_fired) => {	// fired: null or store_id (pending)
    fired = _fired;
    console.log('cleanup, fired:', fired);
    if ([null, 1].includes(fired) == false) { // skip stop (null) keep counter stream subscription alive
      console.log('cleanup: unsubscribe counter stream', fired);
      unsubscribe();
      unsubscribe = null;
      set(null);
    };
  }
}, null)
