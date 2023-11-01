<script lang="js">
  import { onDestroy, onMount } from "svelte";
	export let card;
    import { dataField } from "../lib/fields";
    import { headerColor, newCard } from "../lib/stores";

    var network = "visa";

    onDestroy(() => {
        headerColor.set("rgb(253,248,244)");
    });
</script>

<div id="card">
    {#if Object.hasOwn(card, "image")}
        <div id="creditCard" style="background-image:url({card.image})"></div>
    {:else}
    <div id="creditCard">
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
</div>

<style>
    #card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #creditCard {
        position: relative;
        background-color: var(--color, rgb(253,248,244));
        background: linear-gradient(146deg, rgb(var(--color)), rgba(var(--color), 0.6), rgb(var(--color)));
        width: 323px;
        height: 186px;
        padding: 25px;
        border-radius: 18px;
        box-shadow: 10px 10px 5px silver, 0 0 3px silver;
        background-size: contain;
        background-repeat: no-repeat;
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
    
    
</style>

