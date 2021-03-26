<script>
  import { writable, derived } from 'svelte/store';
  import { from, delta, stream } from './stores.js';

  let forceUpdate = 0;
</script>

<h3>From: {$from[0]} interval: {$delta} sec. count : {$stream}</h3>

<table>
  <caption>Stream query arguments</caption>
  <tr>
    <td>
      <button on:click="{() => ($from = [100, forceUpdate++])}"> ⏱ Start again from 100 </button>
    </td>
    <td>
      <button on:click="{() => ($from = [1000, forceUpdate++])}"> ⏱ Start again from 1000 </button>
    </td>
  </tr>
  <tr>
    <td>
      <button
        on:click="{() => {
          $delta = 2;
        }}"
        >▶️ Set interval 2 seconds
      </button>
    </td>
    <td>
      <button
        on:click="{() => {
          $delta = 0.2;
        }}">
        ⏩ Set interval 0.2 seconds
      </button>
    </td>
  </tr>
</table>

<style>
  td,
  button {
    text-align: center;
  }
  button {
    margin: 0.2em 0.5em;
    width: 15em;
  }
</style>
