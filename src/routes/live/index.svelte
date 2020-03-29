<script context="module">
  export function preload({ params, query }) {
		return this.fetch(`live.json`).then(r => r.json()).then(days => {
      // console.log(days);
			return { days };
		});
	}
</script>

<script>
  export let days;
  import Day from './_day.svelte'
</script>

<style>
  h1 {
    margin-bottom: 1.5rem;
  }
</style>

<svelte:head>
	<title>Live Classes</title>
</svelte:head>

<h1 class='is-size-1'>Live Class Schedule</h1>

{#each Object.keys(days) as day}
  <Day {day} times={days[day]}/>
{/each}