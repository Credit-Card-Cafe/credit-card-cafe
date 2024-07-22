<script lang="ts">
	export let card:CreditCardType;
    export let showTrackCard = false;
    export let scale = 110;
    import TrackCard from "./TrackCard.svelte";
    import { getCardImage } from "$lib/database/read";
    import type { CreditCardType } from "$lib/types";

    var network = "visa";
</script>

{#if card && card.url}
<div class={`flex flex-col items-center transform scale-${scale} hover:z-30`}>
    <a href="/card/{card.url}">
    {#if card.image && (card.id != "null" || card.url != "null")}
        {#await getCardImage(card)}
            <div id="creditCard" class="creditCard bg-alt dark:bg-main-gray shadow-2xl shadow-stone-400 dark:shadow-stone-900" style="background-color:rgb({card.color})"></div>
        {:then image} 
            <div id="creditCard" class="creditCard bg-alt dark:bg-main-gray shadow-2xl shadow-stone-400 dark:shadow-stone-900" style="background-image:url({image})"></div>
        {:catch}
            <div id="creditCard" class="creditCard bg-alt dark:bg-main-gray shadow-2xl shadow-stone-400 dark:shadow-stone-900"></div>
        {/await}
    {:else}
    <div id="creditCard" class="creditCard bg-alt dark:bg-main-gray shadow-2xl shadow-stone-400 dark:shadow-stone-900" >
        {#if card.bank}
            <div id="bank">
                {card.bank}
            </div>
            {#if card.network && (card.bank != card.network)}
                <div id="network" class={network}>
                        {card.network}
                </div>
            {/if}
        {/if}
        {#if card.name}
            <div id="name">
                {card.name}
            </div>
        {/if}
        {#if card.physical && card.physical.chip }
            <div id="chip"/>
        {/if}
    </div>
    {/if}
</a>
    {#if showTrackCard && card.id}
        <TrackCard id={card.id}></TrackCard>
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
    #chip {
        position: absolute;
        background-color: silver;
        height: 0.34in;
        width: 0.42in;
        border-radius: 0.05in;
        top: 0.74in;
        left: 0.35in;
    }
    #bank {
        text-decoration: none;
        position: absolute;
        display: inline-block;
        top: 1.25in;
        font-size: .25in;
        font-weight: 600;
        text-align: center;
        overflow-wrap: normal;
        color: black;
    }
    #name {
        text-decoration: none;
        color: #000;
        display: inline-block;
    }
    #network {
        position: absolute;
        bottom: 0.125in;
        right: 0.125in;
        font-size: 0.45in;
    }
    .visa {
        color: rgb(136, 136, 136);
        text-transform: uppercase;
        font-weight: 750;
    }
    
</style>

