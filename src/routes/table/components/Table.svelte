<script lang="ts">
    import { dataField } from "$lib/fields";
    import TableData from "./TableData.svelte";
    import TableQuery from "./TableQuery.svelte";
    import { type CreditCardType, TLS } from "$lib/types";
    import { injectBankToCard, injectBrandToCard } from "$lib/functions";
    import TableListSwitch from "./TableListSwitch.svelte";
    
    export let tablelist:CreditCardType[];
    export let walletIDList:string[];
    export let trackingIDList:string[];

    let cardIDList:string[]
    let userSelection = 0

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
                if (card.brand_id) {
                    updatedCard = await injectBrandToCard(card);
                }
                return updatedCard;
            })
        ).then((updatedTablelist) => {
            tablelist = updatedTablelist;
        });
    }

    //default queries 
    var queries = ["network"];

    function order(param:string, objectField:string | undefined) {
        if (false && !objectField) {
            //orderCards(param).then((list) => {
            //});
        }
    }

</script>

<div class="flex flex-col px-4 pb-4 pt-8 md:p-10">
    <div class="mb-6 md:mb-10 flex flex-row flex-wrap justify-center">
        <TableQuery field={"network"} bind:queries={queries}></TableQuery>
        <TableQuery field={"brand_name"} bind:queries={queries}></TableQuery>
        <TableQuery field={"consumer"} bind:queries={queries}></TableQuery>
        <TableQuery field={"redemption"} bind:queries={queries}></TableQuery>
        <TableQuery field={"sub"} bind:queries={queries} isObject={true}></TableQuery>
        <TableQuery field={"fees"} bind:queries={queries} isObject={true}></TableQuery>
        <TableQuery field={"physical"} bind:queries={queries} isObject={true}></TableQuery>

    </div>
    <div>
        <TableListSwitch bind:selection={userSelection}></TableListSwitch>
    </div>
    {#if tablelist.length < 1}
    <div class="hidden md:block text-center text-sm">Track cards or add cards to your wallet to view them on the table!</div>
    {/if}
    <table class="dark:text-white-warm rounded-r-xl">
        <!--   Table Header   -->
        <tr class="hidden md:table-row">
            <th>Card</th>
            <th><button on:click={() => order("bank", "bank")}>Bank</button></th>
            {#each queries as query}
                {#if Object.keys(dataField).includes(query) && dataField[query].type !== "object"}
                    <th><button on:click={() => order(query, undefined)}>{dataField[query].name}</button></th>
                {:else if dataField[query] && dataField[query].type === "object"}
                    {#each Object.keys(dataField[query]["data"]) as key}
                        {#if queries.includes(key)}
                            <th>{dataField[query]["data"][key].name}</th>
                        {/if}
                    {/each}
                {/if}
            {/each}
        </tr>
        <!---------------------->



        <!--    Table Data    -->
        {#each tablelist as card}
            {#if cardIDList.includes(card.id)}
            <tr class="even:bg-green-100 dark:even:bg-inherit dark:border-t-2 dark:border-green-500/10">
                <td class="flex md:table-cell flex-col items-center md:text-left odd:rounded-xl md:odd:rounded-r-none md:odd:rounded-l-xl">
                    <a href="/card/{card.id}" class="font-medium mb-6 md:mb-0 md:font-normal">{card.name}</a>
                    <table class="md:hidden w-full">
                        <tr class='tr border-b-2 border-gray-300 dark:border-gray-700 last:border-0'><td>Bank</td><td class='border-l-2 border-gray-300 w-1/2'>{#if card.bank_url}<a href="/bank/{card.bank_url}">{card.bank_name}</a>{:else}{card.bank_name}{/if}</td></tr>
                        <TableData queries={queries} card={card} isTD={false}></TableData>
                    </table>
                </td>
                <td class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell">{#if card.bank_url}<a href="/bank/{card.bank_url}">{card.bank_name}</a>{:else}{card.bank_name}{/if}</td>
                <TableData class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell" queries={queries} card={card} isTD={true}></TableData>
            </tr>
            {/if}
        {/each}
        <!---------------------->


    </table>
</div>

<style>
    th, td {
        @apply p-4;
    }
</style>