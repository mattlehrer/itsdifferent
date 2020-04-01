<script>
	export let day;
  export let times;
  import moment from 'moment-timezone';
	import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import LiveClass from './_liveClass.svelte';
  import tagStore from './_tags.js';

  const dispatch = createEventDispatcher();
  
  const timeslots = {};
  for (const time of times) {
    timeslots[time] = new Set();
    for (const cls of time.liveClasses) {
      timeslots[time].add(...cls.fields.tags);
    }
  }

  function formatTime(inputTime) {
    // time is UTC
    const outputTime = moment.utc(inputTime, "HH:mm");
    outputTime.add(-1 * (new Date().getTimezoneOffset()), 'minutes');
    return `${outputTime.format('LT')} ${moment.tz.zone(moment.tz.guess()).abbr(moment())}`;
  }

  // console.log(times)
</script>

<style>
	h2 {
    margin-bottom: 1rem;
  }

  ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}

  .timeslot {
    border-bottom: 1px solid grey;
  }
</style>

<h2 class='is-size-4 title'>{day}</h2>
<ul>
  {#each times as time}
    {#if time.liveClasses.some(cls => cls.fields.tags.some(t => $tagStore[t])) }
      <div class="columns timeslot" transition:slide|local={{ delay: 100, duration: 350 }} >
        <div class="column is-2">
          <h3>{formatTime(time.time)}</h3>
        </div>
        <div class="column">
          {#each time.liveClasses as cls}
            {#if cls.fields.tags.some(t => $tagStore[t])}
              <li transition:slide|local={{ delay: 100, duration: 350 }}>
                <LiveClass data={cls.fields} on:tag={(e) => dispatch('tag', e.detail.tag)} />
              </li>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  {/each}
</ul>