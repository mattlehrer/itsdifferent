<script>
	export let day;
  export let times;
  import moment from 'moment-timezone';
  import LiveClass from './_liveClass.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  const timeslots = {};
  
  function formatTime(inputTime) {
    // time is UTC
    const outputTime = moment.utc(inputTime, "HH:mm");
    outputTime.add(-1 * (new Date().getTimezoneOffset()), 'minutes');
    return `${outputTime.format('LT')} ${moment.tz.zone(moment.tz.guess()).abbr(moment())}`;
  }
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

<h2 class='is-size-4'>{day}</h2>
<ul>
  {#each times as time}
    <div class="columns timeslot" data-id={time.time}>
      <div class="column is-2">
        <h3>{formatTime(time.time)}</h3>
      </div>
      <div class="column">
        {#each time.liveClasses as cls}
          <li class={cls.fields.tags.join(' ')}>
            <!-- <LiveClass data={cls.fields} on:tag={(e) => console.log(e.detail.tag)} /> -->
            <LiveClass data={cls.fields} on:tag={(e) => dispatch('tag', e.detail.tag)} />
          </li>
        {/each}
      </div>
    </div>
  {/each}
</ul>