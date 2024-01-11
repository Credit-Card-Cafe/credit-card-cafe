<script lang="ts">
    import { dataField } from "$lib/fields";
    import {orderCards} from "$lib/firebase";
    import { cardList, user, admin } from "$lib/stores";
    import { query } from "firebase/firestore";
    import TableData from "./TableData.svelte";
    import TableQuery from "./TableQuery.svelte";
    
    var queries = ["network", "fees", "annual_fee"];
    var results = 5;

    let searchResults = $cardList

    function order(param:string, objectField:string | undefined) {
        if (!objectField) {
            orderCards(param, results).then((list) => {
                searchResults = list;
            });
        }
    }

    $: searchResults = searchResults.filter((card) => (
        (Object.hasOwn(card, "id")
        &&
        Object.hasOwn(card, "name"))
        ||
        $admin
    ));
</script>

<div class="flex flex-col px-4 pb-4 pt-2 md:pt-8 md:p-10">
    <div class="mb-6 md:mb-10 flex flex-row flex-wrap justify-center">
        <TableQuery field={"network"} bind:queries={queries}></TableQuery>
        <TableQuery field={"brand"} bind:queries={queries}></TableQuery>
        <TableQuery field={"consumer"} bind:queries={queries}></TableQuery>
        <TableQuery field={"redemption"} bind:queries={queries}></TableQuery>
        <TableQuery field={"fees"} bind:queries={queries} isObject={true}></TableQuery>
        <TableQuery field={"physical"} bind:queries={queries} isObject={true}></TableQuery>

        
        <label class="block text-center rounded-full bg-white-warm py-1 px-4 mx-1 my-1 transition-all cursor-pointer" for="results">Results: <select bind:value={results} id="results">
            <option disabled selected>{results}</option>
            <option>5</option>
            <option>10</option>
            <option>25</option>
        </select></label>
    </div>

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
        {#each searchResults as card}
        <tr class="even:bg-green-100 dark:even:bg-inherit dark:border-t-2 dark:border-green-500/10">
            <td class="flex md:table-cell flex-col items-center md:text-left odd:rounded-xl md:odd:rounded-r-none md:odd:rounded-l-xl">
                <a href="/card/{card.id}" class="font-medium mb-6 md:mb-0 md:font-normal">{card.name}</a>
                <table class="md:hidden w-full">
                    <tr class='tr border-b-2 border-gray-300 dark:border-gray-700 last:border-0'><td>Bank</td><td class='border-l-2 border-gray-300 w-1/2'>{#if card.bank_id}<a href="/bank/{card.bank_id}">{card.bank}</a>{:else}{card.bank}{/if}</td></tr>
                    <TableData queries={queries} card={card} isTD={false}></TableData>
                </table>
            </td>
            <td class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell">{#if card.bank_id}<a href="/bank/{card.bank_id}">{card.bank}</a>{:else}{card.bank}{/if}</td>
            <TableData class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell" queries={queries} card={card} isTD={true}></TableData>
        </tr>
        {/each}
        <!---------------------->


    </table>
    {#if $admin}
    <div class="fixed top-40 right-8 bg-white p-2 border break-words">
        <pre class="break-words">queries: {JSON.stringify(queries,null,'\t')}</pre>
    </div>
    {/if}
</div>

<style>
    th, td {
        @apply p-4;
    }
</style>