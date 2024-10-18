<script lang="ts">
    export let card:ModifiedCardObject;
    import CardName from "./components/CardName.svelte";
    import CardProps from "./components/CardProps.svelte";
    import CardSub from "./components/CardSUB.svelte";
    import CardRewards from "./components/CardRewards.svelte";
    import CardFees from "./components/CardFees.svelte";
    import CardPhysProps from "./components/CardPhysProps.svelte";
    import type { ModifiedCardObject } from "$lib/types";
    
</script>

<div id="cardInfo" class="dark:text-white-warm mt-4 mb-12 p-4 flex flex-col select-none">
    <h2 class="text-4xl font-bold">More Info</h2>
    <hr>

    <CardProps card={card}></CardProps>
    <hr>

    <CardSub card={card}></CardSub>
    <hr>

    <CardRewards card={card}></CardRewards>
    <hr>

    <CardFees card={card}></CardFees>
    <hr>
    
    <CardPhysProps card={card}></CardPhysProps>
</div>

<style>
    hr {
        margin: 2rem 0;
        border: 2px solid #d6c0a5;
    }
</style>