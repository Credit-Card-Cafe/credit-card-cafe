<script lang="ts">
    export let card:CreditCardType;
    import { lists, dataField, redemption } from "$lib/fields";
    import { YesOrNo, type CreditCardType } from "$lib/types";
    
</script>

<div id="cardInfo" class="dark:text-white-warm mt-4 mb-12 p-4 flex flex-col">
    <div class="text-4xl text-center mb-1">{card.name}</div>
    <div class="mb-8">
        {#if card.brand}<div class="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
            {card.brand}</div>{/if}
        <div class="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>
            <a href="/bank/{card.bank_id}">{card.bank}</a></div>
        <div class="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg> 
            {card.network}
        </div>
        {#if card.consumer}<div class="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>   
            for {card.consumer} use</div>{/if}
    </div>


    {#if card.rewards}
    <div id="rewards" class="mb-8">
        <div class="text-3xl">Rewards:</div>
        <ul>{#each Object.keys(card.rewards) as reward}
            {#if card.redemption} 
                <li>{card.rewards[reward]}{redemption[card.redemption]} {card.redemption} on {lists.rewardCategories[reward]} purchases</li>
            {:else}
            <li>{card.rewards[reward]}x {lists.rewardCategories[reward]}</li>
            {/if}
        {/each}</ul>
    </div>
    {/if}
    
    {#if card.fees}
    <div id="fees" class="mb-8">
        <div class="text-3xl">{dataField["fees"].name}</div>
        <table class="border dark:border-white-warm border-black rounded-md">
            {#each Object.keys(dataField["fees"]["data"]) as field}
                {#if field in card["fees"]}<tr>
                    <td class="p-4 border-r border-b border-white-warm">{dataField["fees"]["data"][field].name}</td>
                    <td class="p-4 border-b border-white-warm">
                        {#if card["fees"][field] == 0}
                            No {dataField["fees"]["data"][field].name}
                        {:else if dataField["fees"]["data"][field].unit == "$"}
                            ${card["fees"][field]}
                        {:else}
                            {card["fees"][field]}{dataField["fees"]["data"][field].unit}
                        {/if}
                    </td>
                </tr>{/if}
            {/each}
        </table>
        <div class="text-xs">*Some Fees May Not Be Listed</div>
    </div>
    {/if}

    {#if card.physical}
    <div id="physical" class="mb-8">
        <div class="text-3xl">Physical Properties:</div>
        {#each Object.keys(card.physical) as property}
            <div class="flex flex-row items-center">
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

    {#if card.link}
        <div class="flex flex-col items-center"><a class="text-main-gray bg-green-500 hover:bg-green-600 text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-all cursor-pointer" href={card.link}>Apply to the card here</a></div>
    {/if}
</div>

<style>
    table {
        border-collapse: separate !important;
    }
</style>