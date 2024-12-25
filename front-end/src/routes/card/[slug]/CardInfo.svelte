<script lang="ts">
    export let card:ModifiedCardObject;
    import CardSub from "./components/CardSUB.svelte";
    import CardRewards from "./components/CardRewards.svelte";
    import CardFees from "./components/CardFees.svelte";
    import CardPhysProps from "./components/CardPhysProps.svelte";
    import type { ModifiedCardObject } from "$lib/types";
    
</script>

<div id="cardInfo" class="dark:text-white-warm mt-4 mb-12 lg:p-8 flex flex-col lg:grid grid-cols-2 gap-8 select-none">
    <span class="flex items-center justify-center"><h2 class="text-4xl font-light">Additional Info</h2></span>
    <CardSub card={card}></CardSub>
    <CardRewards card={card}></CardRewards>
    <CardFees card={card}></CardFees>
    <CardPhysProps card={card}></CardPhysProps>
</div>
