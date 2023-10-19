<script lang="js">
	export let card;
    import { dataField } from "../lib/fields";
    import { newCard } from "../lib/stores";

    var network = "visa";

</script>

<div id="card">
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
    <!-- {#each Object.keys(card) as prop}
        {#if !(prop == "url" || prop == "color")}
            {#if typeof card[prop] == "object"}
                {#each Object.keys(card[prop]) as propprop}
                <div id="{propprop}"><span class="name">{dataField[prop]["data"][propprop].name}: </span><span class="prop">{card[prop][propprop]}</span></div>
                {/each}
            {:else}
                <div id="{prop}"><span class="name">{dataField[prop].name}: </span><span class="prop">{card[prop]}</span></div>
            {/if}
        {/if}
    {/each} -->
</div>

<style>
    #card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #creditCard {
        position: relative;
        background-color: var(--color, #FFF);
        background: linear-gradient(146deg, rgb(var(--color)), rgba(var(--color), 0.6), rgb(var(--color)));
        width: 3.375in;
        height: 2.125in;
        padding: .25in;
        border-radius: 10px;
        box-shadow: 10px 10px 5px silver, 0 0 3px silver;
    }
    #chip {
        position: absolute;
        background-color: silver;
        height: .3125in;
        width: 0.4375in;
        border-radius: 0.05in;
        top: 0.75in;
        left: 0.375in;
        bottom: 1.0625in;
    }
    #bank {
        position: absolute;
        display: inline-block;
        top: 1.25in;
        font-size: .25in;
        text-align: center;
        overflow-wrap: normal;
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

