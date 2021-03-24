<script>
  import { from } from "./stores.js";
  import Stream from "./Stream.svelte";
  import Noop from "./Noop.svelte";
  let toggle = true;

  $: console.log("Query from:", $from);
</script>

<button
  on:click={() => toggle = !toggle}>
  &#x2630 Toggle nested components
</button>

{#if toggle}
  <Stream />
{:else}
  <Noop />
{/if}
