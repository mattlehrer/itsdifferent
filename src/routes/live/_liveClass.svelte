<script>
	export let data;
</script>

<style>
  a {
    color: inherit;
  }
  .classLogo {
    width: auto;
    height: auto;
  }

  .description {
    font-size: 1rem;
  }
</style>

<a href={data.url}>
  <div class='columns'>
    <div class='column is-2'><img class='classLogo' src={data.image.fields.file.url} alt={data.image.fields.title} /></div>
    <div class="column">
      <div class='is-size-4'>{data.name}</div>
      <div class='description'>{@html data.description.content[0].content[0].value}</div>
    </div>
    <div class='column is-1'>
      {#each data.tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>
  </div>
</a>
