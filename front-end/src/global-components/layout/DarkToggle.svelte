<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let theme;

    const dispatch = createEventDispatcher();

    function toggleTheme() {
        dispatch('toggleTheme');
    }

    function respectSystemPreference() {
        dispatch('respectSystemPreference')
    }
    
  </script>
  
  <div class="rounded-lg bg-theme-lightgray dark:bg-theme-darkgray w-full lg:w-fit flex flex-row justify-center gap-x-6 p-2">
    <button on:click={toggleTheme}  class="rounded-md text-sm w-full lg:w-fit p-2 {theme != 'null' ? "bg-theme-blue text-theme-white hover:bg-theme-blue-hov" : "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov"}">{theme === 'dark' ? "Toggle Light Mode" : "Toggle Dark Mode"}</button>
    <button on:click={respectSystemPreference} class="rounded-md text-sm w-full lg:w-fit p-2 {theme !== 'null' ? "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov" : "bg-theme-blue text-theme-white hover:bg-theme-blue-hov"}">{true ? "Respect System Theme" : "Viewing Tracked Cards"}</button>
  </div>
  
<style>
    :global(body) {
      transition: background-color 0.3s, color 0.3s;
    }
  </style>
  