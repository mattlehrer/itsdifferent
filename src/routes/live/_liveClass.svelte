<script>
  export let data;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

</script>

<style>
  a {
    color: inherit;
  }

  .column {
    padding: 0.5rem 0.75rem;
  }

  .logo-column {
    padding-right: 0.25rem;
  }

  .class-logo {
    width: auto;
    height: auto;
  }

  .name {
    line-height: 1.5rem;
    display: inline-block;
  }

  .description {
    font-size: 1rem;
  }

  .tags {
    display: flex;
    justify-content: flex-end;
    padding-right: 1.5rem;
  }
</style>

<a href={data.url}>
  <div class='columns is-mobile'>
    <div class='column logo-column is-3'><img class='class-logo' src={data.image.fields.file.url} alt={data.image.fields.title} /></div>
    <div class="column">
      <div class='name is-size-4'>{data.name}</div>
      <div class='description'>{@html data.description.content[0].content[0].value}</div>
    </div>
  </div>
</a>
<div class='columns is-mobile'>
  <div class='column is-offset-3 tags'>
    {#each data.tags as tag}
      <button class="button tag is-light" on:click="{() => dispatch('tag', {tag})}">{tag}</button>
    {/each}
  </div>
</div>
