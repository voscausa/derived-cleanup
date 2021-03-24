<script>
	import { writable, derived } from 'svelte/store';
	import { from, delta, stream } from './stores.js'
</script>

<h1>From: {$from} interval: {$delta} count : {$stream}</h1>

<h3>
	Streamed counter query arguments:
</h3>

<div>
	<button on:click={() => {$from = 100}}>
    ⏱ count from 100
	</button>

	<button on:click={() => {$from = 1000}}>
		⏱ count from 1000
	</button>

	<br>

	<button on:click={() => {$delta = 2}}>
		▶️ interval 2 seconds
	</button>

	<button on:click={() => {$delta = .2}}>
		⏩ interval 0.2 seconds
	</button>
</div>
