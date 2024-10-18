<script lang="ts">
    import type { CardObject } from "$lib/types";
	export let card:CardObject;
    export let showTrackCard = false;
    export let scale = 110;
    export let altLink: undefined | string = undefined;
    import TrackCard from "./TrackCard.svelte";
</script>

{#if card && card.card_url}
<div class={`flex flex-col items-center transform scale-${scale} hover:z-30`}>
    <a href={altLink ? altLink : `/card/${card.card_url}`} >
        <div id="creditCard" class="creditCard bg-alt dark:bg-main-gray shadow-2xl shadow-stone-400 dark:shadow-stone-900" style="background-color:{card.card_color}"></div>
    </a>
    {#if showTrackCard && card.card_id}
        <TrackCard id={card.card_id}></TrackCard>
    {/if}
</div>
{/if}

<style>
    #creditCard {
        position: relative;
        background-image: linear-gradient(146deg, rgb(var(--color)), rgba(var(--color), 0.6), rgb(var(--color)));
        width: 3.37in;
        height: 2.125in;
        padding: 25px;
        border-radius: 0.125in;
        background-size: contain;
        background-repeat: no-repeat;
    }

</style>

