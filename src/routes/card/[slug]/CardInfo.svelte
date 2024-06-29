<script lang="ts">
    export let card:CreditCardType;
    import CardName from "./components/CardName.svelte";
    import CardProps from "./components/CardProps.svelte";
    import CardSub from "./components/CardSUB.svelte";
    import CardRewards from "./components/CardRewards.svelte";
    import CardFees from "./components/CardFees.svelte";
    import CardPhysProps from "./components/CardPhysProps.svelte";
    import type { CreditCardType } from "$lib/types";
    
</script>

<div id="cardInfo" class="dark:text-white-warm mt-4 mb-12 p-4 flex flex-col">
    <CardName card={card}></CardName>
    <hr>

    <CardProps card={card}></CardProps>
    <hr>

    {#if card.sub}
    <CardSub card={card}></CardSub>
    <hr>
    {/if}

    {#if card.rewards}
    <CardRewards card={card}></CardRewards>
    <hr>
    {/if}

    {#if card.fees}
    <CardFees card={card}></CardFees>
    <hr>
    {/if}
    
    {#if card.physical}
    <CardPhysProps card={card}></CardPhysProps>
    {/if}
</div>

<style>
    hr {
        margin: 2rem 0;
        border: 2px solid #d6c0a5;
    }
</style>