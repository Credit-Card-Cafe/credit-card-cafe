<script lang="ts">
    import TableData from "./TableData.svelte";
    import TableQuery from "./TableQuery.svelte";
    import {type COData, type CardObject, COP, TLS } from "$lib/types";
    import { injectBankToCard, injectBrandToCard } from "$lib/functions";
    import TableListSwitch from "./TableListSwitch.svelte";
    
    export let tablelist:CardObject[];
    export let walletIDList:string[];
    export let trackingIDList:string[];

    let cardIDList:string[]
    let userSelection = TLS.Both

    const queryList: readonly COP[] = Object.values(COP).filter((prop): prop is COData =>
        prop !== COP.card_id &&
        prop !== COP.card_name &&
        prop !== COP.card_bank &&
        prop !== COP.card_url &&
        prop !== COP.card_link &&
        prop !== COP.card_color &&
        prop !== COP.card_image
    );

    $: cardIDList = (() => {
        if (userSelection == TLS.Wallet) {
            return walletIDList;
        } else if (userSelection == TLS.Tracking) {
            return trackingIDList;
        } else if (userSelection == TLS.Both) {
            return [...walletIDList, ...trackingIDList];
        } else {
            return [];
        }
    })();

    
    if (tablelist.length > 0) {
        Promise.all(
            tablelist.map(async (card) => {
                let updatedCard = await injectBankToCard(card);
                if (card.card_brand) {
                    updatedCard = await injectBrandToCard(card);
                }
                return updatedCard;
            })
        ).then((updatedTablelist) => {
            tablelist = updatedTablelist;
        });
    }

    //default queries 
    var queries:COP[] = [COP.card_network, COP.card_af, COP.card_ftf, COP.card_apr];

    function order(param:COP) {
        ; // Sort table by param 
    }

</script>

<main class="flex flex-col px-4">
    <div class="mb-6 md:mb-10 flex flex-row flex-wrap justify-center">
        {#each queryList as property}
            <TableQuery field={property} bind:queries={queries}></TableQuery>
        {/each}
    </div>
    {#if walletIDList.length > 0 && trackingIDList.length > 0}
    <div>
        <TableListSwitch bind:selection={userSelection}></TableListSwitch>
    </div>
    {/if}
    {#if tablelist.length < 1}
    <div class="hidden md:block text-center text-sm">Track cards or add cards to your wallet to view them on the table!</div>
    {/if}

    <table class="dark:text-white-warm rounded-r-xl">
        <!--   Table Header   -->
        <tr class="hidden md:table-row">
            <th>Card</th>
            <th><button on:click={() => order(COP.card_bank)}>Bank</button></th>
            {#each queries as query}
                <th><button on:click={() => order(query)}>{query}</button></th>
            {/each}
        </tr>
        <!---------------------->



        <!--    Table Data    -->
        {#each tablelist as card}
            {#if card.card_id && cardIDList.includes(card.card_id) || !(walletIDList.length > 0 && trackingIDList.length > 0)}
            <tr class="even:bg-green-100 dark:even:bg-inherit dark:border-t-2 dark:border-theme-green/10">
                <td class="flex md:table-cell flex-col items-center md:text-left odd:rounded-xl md:odd:rounded-r-none md:odd:rounded-l-xl">
                    <a href="/card/{card.card_url}" class="font-medium mb-6 md:mb-0 md:font-normal">{card.card_name}</a>
                </td>
                <td class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell">{#if card.card_bank}<a href="/bank/{card.card_url}">{card.card_bank}</a>{:else}{card.card_bank}{/if}</td>
                <TableData class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell" queries={queries} card={card}></TableData>
            </tr>
            {/if}
        {/each}
        <!---------------------->


    </table>
</main>

<style>
    th, td {
        @apply p-4;
    }
</style>