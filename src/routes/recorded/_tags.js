
 import { writable } from 'svelte/store';

 const { subscribe, set, update } = writable({});

 const addTag = tag => update(tags => {
     tags[tag] = true;
     return tags;
 });

 export default {
    subscribe,
    addTag,
    update,
    set,
 }