<script context="module">
  export function preload({ params, query }) {
		return this.fetch(`live.json`).then(r => r.json()).then(days => {
      // console.log(days);
			return { days };
		});
	}
</script>

<script>
  import Day from './_day.svelte'
  export let days;

  let tagSet = new Set();
  for (const day in days) {
    for (const time of days[day]) {
      for (const cls of time.liveClasses) {
        tagSet.add(...cls.fields.tags);
      }
    }
  }
  let tagIsActive = {};
  for (const tag of tagSet) {
    tagIsActive[tag] = true;
  }

  function tagClick(e) {
    if (tagSet.has(this.innerText)) {
      tagIsActive[this.innerText] = !tagIsActive[this.innerText];
      console.log(tagIsActive)
    }
  }

  function tagCapture({detail}) {
    // console.log(detail);
    for (const tag of tagSet) {
      if (tag === detail) {
        tagIsActive[tag] = true;
      } else {
        tagIsActive[tag] = false;
      }
    }
    console.log(tagIsActive);
  }
</script>

<style>
  h1 {
    margin-bottom: 1.25rem;
  }
</style>

<svelte:head>
	<title>Live Classes</title>
</svelte:head>

<!-- <svelte:window on:click={tagClick}/> -->

<h1 class='is-size-3'>Live Class Schedule</h1>

<div class="buttons">
  {#each [...tagSet] as tag}
    <button data="{tag}" class="button is-light" on:click={tagClick}>{tag}</button>
  {/each}
</div>

{#each Object.keys(days) as day}
  <Day {day} times={days[day]} on:tag={tagCapture} />
{/each}