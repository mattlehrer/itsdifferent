<script context="module">
  export function preload({ params, query }) {
		return this.fetch(`recorded.json`).then(r => r.json()).then(content => {
			return { content };
		});
	}
</script>

<script>
  import moment from 'moment';
  // import * as animateScroll from 'svelte-scrollto';
  import { slide } from 'svelte/transition';
  import Recorded from './_recorded.svelte';
  import tagStore from './_tags.js';
  export let content;

  let allTags = [];
  for (const cls of content) {
    allTags = [...allTags, ...cls.fields.tags];
  }
  const tagSet = new Set(allTags);
  for (const tag of tagSet) {
    tagStore.addTag(tag);
  }

  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  content = shuffle(content);

  function tagClick(e) {
    if (tagSet.has(this.innerText)) {
      tagStore.update(ts => {
        if ([...tagSet].every(t => ts[t])) {
          for (const tag of tagSet) {
            if (tag !== this.innerText) ts[tag] = false;
          }
        } else {
          ts[this.innerText] = !ts[this.innerText];
          // if all are false now, set all to true
          if ([...tagSet].every(t => !ts[t])) {
            for (const tag of tagSet) {
              ts[tag] = true;
            }
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
	<title>Recorded Content</title>
</svelte:head>

<h1 class='is-size-3'>Recorded Content</h1>

<div class="buttons">
  {#each [...tagSet] as tag}
    <button data="{tag}" class="button is-light {$tagStore[tag] ? 'is-inverted' : ''}" on:click={tagClick}>{tag}</button>
  {/each}
</div>

{#each content as cls}
  {#if cls.fields.tags.some(t => $tagStore[t])}
    <div transition:slide|local={{ delay: 100, duration: 350 }}>
      <Recorded data={cls.fields} on:tag={tagCapture} />
    </div>
  {/if}
{/each}