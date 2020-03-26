<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`classes.json`).then(r => r.json()).then(classes => {
			return { classes };
		});
	}
</script>

<script>
	export let classes;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Classes</title>
</svelte:head>

<h1>Calendar</h1>

<ul>
	{#each classes as cls}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='classes/{cls.slug}'>{cls.title} - {cls.days} @ {cls.time}</a></li>
	{/each}
</ul>