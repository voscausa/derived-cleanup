import { readable } from 'svelte/store';

export function query(from = 0, delta = 1) {
  let interval, timer;
  let count = from;

  function setTimer(set) {
    return (seconds) => {
      return setInterval(() => set(count += 1), seconds * 1000);
    };
  }

  const counter = readable(from, set => {
    timer = setTimer(set);
    interval = timer(delta);
    return () => clearInterval(interval);
  });

  return {
    subscribe: counter.subscribe,
    set delta(value) {
      clearInterval(interval);
      interval = timer(value);
    }
  }
}
