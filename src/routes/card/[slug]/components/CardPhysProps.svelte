<script lang="ts">
    import { type CreditCardType, YesOrNo } from "$lib/types";
    import { dataField } from "$lib/fields";
    export let card:CreditCardType;
</script>

{#if card.physical}
    <div id="physical" class="mb-8 lg:p-6">
        <div class="text-3xl mb-4">Physical Properties:</div>
        {#each Object.keys(card.physical) as property}
            <div class="my-2 flex flex-row items-center">
                {#if card.physical[property] == YesOrNo.No}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>  
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 text-green-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                {/if}
                {dataField["physical"]['data'][property].name}: {card.physical[property]}
            </div>
        {/each}
    </div>
    {/if}