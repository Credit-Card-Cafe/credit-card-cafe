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
    <CardProps card={card}></CardProps>
    <CardSub card={card}></CardSub>
    <CardRewards card={card}></CardRewards>
    <CardFees card={card}></CardFees>
    <CardPhysProps card={card}></CardPhysProps>
    

    {#if card.link}
        <div class="flex flex-col items-center justify-center lg:col-start-2 lg:row-start-4"><a class="text-main-gray bg-green-500 hover:bg-green-600 text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-all cursor-pointer" href={card.link}>Apply to the card here</a></div>
    {/if}
</div>