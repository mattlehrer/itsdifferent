<script>
  export let data;
  import { createEventDispatcher } from 'svelte';
  import * as psl from 'psl';

	const dispatch = createEventDispatcher();
  function formatDescription(content) {
    return content.map(c => {
      if (c.nodeType === 'text') {
        return c.value;
      } else if (c.nodeType === 'hyperlink') {
        return `<a href="${c.data.uri}">${formatDescription(c.content)}</a>`;
      }
      console.error(c);
      return '?';
    }).join('');
  }
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
    max-height: 200px;
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
      <div class='description'>{@html formatDescription(data.description.content[0].content)}</div>
    </div>
  </div>
</a>
<div class='columns is-mobile'>
  <div class="column is-3">
    <button class="button tag is-info is-light is-inverted">{psl.parse(new URL(data.url).hostname).sld}</button>
  </div>
  <div class='column tags'>
    {#each data.tags as tag}
      <button class="button tag is-light" on:click="{() => dispatch('tag', {tag})}">{tag}</button>
    {/each}
  </div>
</div>
