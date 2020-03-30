<script context="module">
  export function preload({ params, query }) {
		return this.fetch(`live.json`).then(r => r.json()).then(days => {
      // console.log(days);
			return { days };
		});
	}
</script>

<script>
  import Day from './_day.svelte';
  import tagStore from './_tags.js';
  export let days;

  let tagSet = new Set();
  for (const day in days) {
    for (const time of days[day]) {
      for (const cls of time.liveClasses) {
        tagSet.add(...cls.fields.tags);
      }
    }
  }
  for (const tag of tagSet) {
    tagStore.addTag(tag);
  }

  function tagClick(e) {
    if (tagSet.has(this.innerText)) {
      tagStore.update(ts => {
        ts[this.innerText] = !ts[this.innerText];
        // if all are false now, set all to true
        if ([...tagSet].every(t => !ts[t])) {
          for (const tag of tagSet) {
            ts[tag] = true;
          }
        }
        return ts;
      });
    }
  }

  function tagCapture({ detail }) {
    for (const tag of tagSet) {
      if (tag === detail) {
        tagStore.update(ts => {
          ts[tag] = true;
          return ts;
        });
      } else {
        tagStore.update(ts => {
          ts[tag] = false;
          return ts;
        });
      }
    }
    console.log($tagStore);
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
    <button data="{tag}" class="button is-light {$tagStore[tag] ? 'is-inverted' : ''}" on:click={tagClick}>{tag}</button>
  {/each}
</div>

{#each Object.keys(days) as day}
  <Day {day} times={days[day]} on:tag={tagCapture} />
{/each}