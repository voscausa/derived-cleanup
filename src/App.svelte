<script>
  import { from } from "./stores.js";
  import Stream from "./Stream.svelte";
  import Noop from "./Noop.svelte";
  let toggle = true;

  $: console.log("Query from:", $from);
</script>

<section>
  <div>
    <button on:click={() => (toggle = !toggle)}> &#x2630 Toggle nested components </button>
  </div>
</section>

<section>
  {#if toggle}
    <Stream />
  {:else}
    <Noop />
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-flow: column nowrap;
    text-align: center;
    width: 30em;
  }
  button {
    margin: 0.2em 0.2em;
  }
</style>
