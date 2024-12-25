<script lang="ts">
    import type { CardObject } from "$lib/types";
	  export let card:CardObject;
    export let showTrackCard = false;
    export let allowClick = true;
    export let shadow = true;
    export let altLink: undefined | string = undefined;
    import TrackCard from "./TrackCard.svelte";

    import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const isMobile = writable(false);
  
  let clickCount = 0;
  let linkUrl = `/card/${card.card_url}`;

  if (altLink) linkUrl = altLink

  const checkScreenSize = () => {
    isMobile.set(window.matchMedia('(max-width: 640px)').matches);
  };

  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  });

  function handleClick(event: { preventDefault: () => void; }) {
    if (allowClick) $isMobile ? handleMobileClick(event) : handleDesktopClick();
  }

  function handleDesktopClick() {
    // For desktop, go to the link on single click
    if (allowClick) window.location.href = linkUrl;
  }

  function handleMobileClick(event: { preventDefault: () => void; }) {
    event.preventDefault(); // Prevent the default link action
    clickCount += 1;

    if (allowClick && clickCount === 2) {
      window.location.href = linkUrl; // Redirect on double-click
      clickCount = 0; // Reset click count
    }

    setTimeout(() => (clickCount = 0), 1000);
  }


</script>

{#if card && card.card_url}
<div class='{showTrackCard && card.card_id ? " items-center" : ""} flex flex-col'>
    <button on:click={handleClick}>
        <div id="creditCard" class='creditCard z-20 flex flex-col items-center justify-evenly {shadow ? "shadow-2xl shadow-theme-shadow dark:shadow-theme-shadow-dark": ""}' style="background-color:{card.card_color}; background-image: url('/storage/{card.card_url}.jpeg')">
          <slot></slot>
        </div>
      </button>
    {#if showTrackCard && card.card_id}
        <TrackCard id={card.card_id}></TrackCard>
    {/if}
</div>
{/if}

<style>
    #creditCard {
        position: relative;
        background-color: linear-gradient(146deg, rgb(var(--color)), rgba(var(--color), 0.6), rgb(var(--color)));
        width: 20.25rem;
        height: 12.75rem;
        border-radius: 0.75rem;
        background-size: contain;
        background-repeat: no-repeat;
    }

</style>

