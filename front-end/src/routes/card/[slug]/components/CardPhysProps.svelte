<script lang="ts">
    import { parseDatabaseString } from "$lib/functions";
    import { COP, type ModifiedCardObject } from "$lib/types";
    export let card:ModifiedCardObject;
    
</script>

{#if card.card_material || card.card_weight || card.card_embossed || card.card_chip || card.card_il || card.card_ttp}
<div id="physical" class="lg:h-max lg:mb-8 p-6 shadow-all-xl dark:shadow-theme-shadow-dark lg:rounded-2xl flex flex-col items-center">
    <div class="text-3xl mb-8">Physical Properties</div>
    <div class="h-max flex flex-col justify-between gap-6">
        {#if card.card_material}
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>                   
            <p class="p-4 text-center">Material: {card.card_material}</p>
        </div>
        {/if}
        {#if card.card_weight}
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="size-6">
                <!-- Left weights -->
                <rect x="1.5" y="7" width="3" height="10" rx="1.5" />
                <rect x="5" y="7" width="3" height="10" rx="1.5" />
            
                <!-- Bar -->
                <rect x="9" y="10.5" width="6" height="3" rx="1.5" />
            
                <!-- Right weights -->
                <rect x="16" y="7" width="3" height="10" rx="1.5" />
                <rect x="19.5" y="7" width="3" height="10" rx="1.5" />
            </svg>
            <p class="p-4 text-center">Weight: {parseDatabaseString(card, COP.card_weight)}</p>
        </div>
        {/if}
        {#if Object.hasOwn(card, "card_embossed")}
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
            </svg>
            <p class="p-4 text-center">{#if card.card_embossed} Is Embossed {:else} Not Embossed {/if}</p>
        </div>
        {/if}
        {#if Object.hasOwn(card, "card_chip")}
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
            </svg>      
            <p class="p-4 text-center">{#if card.card_chip} Has EMV Chip {:else} Does not have EMV Chip {/if}</p>
        </div>
        {/if}
        {#if card.card_il}
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>      
            <p class="p-4 text-center">Info Location: {card.card_il}</p>
        </div>        
        {/if}
        {#if Object.hasOwn(card, "card_ttp")}
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p class="p-4 text-center">{#if card.card_ttp} Tap to Pay Enabled {:else} No Tap to Pay {/if}</p>
        </div>
        {/if}
    </div>
</div>
{/if}
