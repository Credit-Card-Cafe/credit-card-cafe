<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    import { dataField } from "$lib/fields";

    export let card:CreditCardType;
    export let queries:Array<string>;
    export let isTD:boolean;

    
</script>

{#each queries as query}
    {#if isTD}
        {#if Object.keys(dataField).includes(query) && dataField[query].type !== "object"}
            <td class="{$$restProps.class || ''}">{card[query] === undefined ? "[No Data]" : card[query]}</td>
        {:else if dataField[query] && dataField[query].type === "object"}
            {#each Object.keys(dataField[query]["data"]) as key}
                {#if queries.includes(key) && card[query] && card[query][key] && dataField[query]["data"][key].unit}
                    <td class="{$$restProps.class || ''}">{dataField[query]["data"][key].unit == "$" ? "$" + card[query][key]: card[query][key] + dataField[query]["data"][key].unit}</td>
                {:else if queries.includes(key) && card[query] && card[query][key]}
                    <td class="{$$restProps.class || ''}">{card[query][key]}</td>
                {:else if queries.includes(key)}
                    <td class="{$$restProps.class || ''}">[No Data]</td>
                {/if}
            {/each}
        {/if}
    {:else}
        {#if Object.keys(dataField).includes(query) && dataField[query].type !== "object" && card[query]}
            <tr class='tr border-b-2 border-gray-300 dark:border-gray-700 last:border-0'><td class='td'>{dataField[query].name}</td><td class='td tdTwo'>{card[query]}</td></tr>
        {:else if dataField[query] && dataField[query].type === "object"}
            {#each Object.keys(dataField[query]["data"]) as key}
                {#if queries.includes(key) && card[query] && card[query][key] && dataField[query]["data"][key].unit}
                    <tr class='tr border-b-2 border-gray-300 dark:border-gray-700 last:border-0'><td class='td'>{dataField[query]["data"][key].name}</td><td class='td tdTwo'>{dataField[query]["data"][key].unit == "$" ? "$" + card[query][key]: card[query][key] + dataField[query]["data"][key].unit}</td></tr>
                {:else if queries.includes(key) && card[query] && card[query][key]}
                    <tr class='tr border-b-2 border-gray-300 dark:border-gray-700 last:border-0'><td class='td'>{dataField[query]["data"][key].name}</td><td class='td tdTwo'>{card[query][key]}</td></tr>
                {/if}
            {/each}
        {/if}
    {/if}
{/each}

<style>
    .tdTwo {
        @apply border-l-2 border-gray-300 w-1/2;
    }
    td {
        @apply p-4;
    }
</style>