<script lang="js">
  import { onDestroy } from "svelte";
	export let card;
    export let showTrackCard = false;
    export let inCardStack = false;
    export let left = false;
    import { headerColor, newCard } from "$lib/stores";
    import TrackCard from "./TrackCard.svelte";
    import { getCardImage } from "$lib/firebase";
    import CardInfoShort from "./CardInfoShort.svelte";

    var network = "visa";

    onDestroy(() => {
        headerColor.set("rgb(253,248,244)");
    });
</script>


<div id="card">
    <a href="/card/{card.id}">
    {#if Object.hasOwn(card, "image") && card.image != false || $newCard.image == "pending"}
        {#await getCardImage(card)}
            <div id="creditCard" class={left?"left":"right"} style="background:rgb(253,248,244);"></div>
        {:then image} 
            <div id="creditCard" class={left?"left":"right"} style="background-image:url({image})"></div>
        {:catch}
            <div id="creditCard" class={left?"left":"right"} style="background:rgb(253,248,244);"></div>
        {/await}
    {:else}
    <div id="creditCard" class={left?"left":"right"}>
        {#if Object.hasOwn(card, "bank")}
            <div id="bank">
            {#if Object.hasOwn($newCard, "bank")}
                {$newCard.bank}
            {:else}
                {card.bank}
            {/if}
            </div>
            {#if Object.hasOwn(card, "network") && (card.bank != card.network)}
                <div id="network" class={network}>
                    {#if Object.hasOwn($newCard, "network")}
                        {$newCard.network}
                    {:else}
                        {card.network}
                    {/if}
                </div>
            {/if}
        {/if}
        {#if Object.hasOwn(card, "name")}
            <div id="name">
            {#if Object.hasOwn($newCard, "name")}
                {$newCard.name}
            {:else}
                {card.name}
            {/if}
            </div>
        {/if}
        {#if 
        Object.hasOwn(card, "physical") 
        && 
        Object.hasOwn(card.physical, "chip") 
        &&
        card.physical.chip == "Yes"
        &&
        !( Object.hasOwn($newCard, "physical") && Object.hasOwn($newCard["physical"], "chip"))
        }
            <div id="chip"/>
        {:else if Object.hasOwn($newCard, "physical") && Object.hasOwn($newCard["physical"], "chip") && $newCard.physical.chip == "Yes"} 
                <div id="chip"/>
        {/if}
    </div>
    {/if}
</a>
    {#if showTrackCard}
    <TrackCard id={card.id}></TrackCard>
    {/if}
    {#if inCardStack}
       <div id="cis" class={left?"left card":"right card"}><CardInfoShort card={card} left={left}></CardInfoShort></div>
    {/if}
</div>



<style>
    #card {
        display: flex;
        flex-direction: column;
        align-items: center;
        -webkit-transform:scale(0.9);
        -moz-transform:scale(0.9);
        -ms-transform:scale(0.9);
        transform:scale(0.9);
    }
    #creditCard {
        position: relative;
        background: rgb(253,248,244);
        background-image: linear-gradient(146deg, rgb(var(--color)), rgba(var(--color), 0.6), rgb(var(--color)));
        width: 323px;
        height: 185px;
        padding: 25px;
        border-radius: 18px;
        background-size: contain;
        background-repeat: no-repeat;
    }
    #creditCard.right{
        box-shadow: 10px 10px 5px silver, 0 0 3px silver;
    }
    #creditCard.left{
        box-shadow: 0 10px 5px silver, 0 0 3px silver;
    }
    #chip {
        position: absolute;
        background-color: silver;
        height: 35px;
        width: 47px;
        border-radius: 0.05in;
        top: 82px;
        left: 42px;
        bottom: 1.0625in;
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
    #cis {
        position: absolute;
        z-index: -1;
    }
    #cis.right {
        transition:left 0.33s linear;
    }
    #cis.left {
        transition:right 0.33s linear;
    }
    @media (min-width: 768px) {
        #cis.right {
            left: 0;
        }
        #cis.left {
            right: 0;
        }
        #card {
        -webkit-transform:scale(1);
        -moz-transform:scale(1);
        -ms-transform:scale(1);
        transform:scale(1);
        }
        #card:hover #cis.right {
            left: 323px;
        }
        #card:hover #cis.left {
            right: 323px;
        }
    }
    
</style>

