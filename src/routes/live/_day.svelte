<script>
	export let day;
  export let times;
  import moment from 'moment';
  import LiveClass from './_liveClass.svelte';
  
  function formatTime(inputTime) {
    // time is UTC
    const outputTime = moment.utc(inputTime, "HH:mm");
    outputTime.add(-1 * (new Date().getTimezoneOffset()), 'minutes');
    return outputTime.format('LT');
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

<h2 class='is-size-3'>{day}</h2>
<ul>
  {#each times as time}
    <div class="columns timeslot">
      <div class="column is-2">
        <h3>{formatTime(time.time)}</h3>
      </div>
      <div class="column">
        {#each time.liveClasses as cls}
          <li>
            <LiveClass data={cls.fields} />
          </li>
        {/each}
      </div>
    </div>
  {/each}
</ul>