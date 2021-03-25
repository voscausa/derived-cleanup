<script>
	import { writable, derived } from 'svelte/store';
	import { from, delta, stream } from './stores.js'
  
  let forceUpdate = 0;
</script>

<h1>From: {$from[0]} interval: {$delta} count : {$stream}</h1>

<h3>
	Streamed counter query arguments:
</h3>

<div>
  <table>
    <tr>
      <td>
        <button on:click={() => $from = [100, forceUpdate++]}>
          ⏱ Start again from 100
        </button>
      </td>
      <td>
        <button on:click={() => $from = [1000, forceUpdate++]}>
          ⏱ Start again from 1000
        </button>
      </td>
    </tr>
    <tr>
      <td>
        <button on:click={() => {$delta = 2}}>
          ▶️ Set interval 2 seconds
        </button>
      </td>
      <td>  
        <button on:click={() => {$delta = .2}}>
          ⏩ Set interval 0.2 seconds
        </button>
      </td>
  </tr>
</table>
</div>

<style>
  td { 
    text-align: center;
  }
  button {
    margin: .2em .2em;
  }
</style>
