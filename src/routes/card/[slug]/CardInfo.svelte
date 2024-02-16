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
</div>