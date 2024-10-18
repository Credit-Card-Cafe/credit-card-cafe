<script lang="ts">
    import { parseDatabaseString } from "$lib/functions";
    import { type CardObject, COP } from "$lib/types";
    export let card:CardObject;
    export let queries:COP[];
    
</script>

{#each queries as query}
    <td class="{$$restProps.class || ''}">
        {card[query] === undefined ? "[No Data]" : parseDatabaseString(card, query)}
    </td>
{/each}

<style>
    .tdTwo {
        @apply border-l-2 border-gray-300 w-1/2;
    }
    td {
        @apply p-4;
    }
</style>