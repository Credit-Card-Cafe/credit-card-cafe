<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    import { dataField } from "$lib/fields";
    export let card:CreditCardType;
</script>

{#if card.fees}
    <div id="fees" class="mb-8">
        <div class="text-3xl mb-4">{dataField["fees"].name}</div>
        <table class="my-2">
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
    <hr>
    {/if}

    <style>
        hr {
            margin: 2rem 0;
            border: 2px solid #d6c0a5;
        }
        table {
            border-collapse: separate !important;
        }
    </style>