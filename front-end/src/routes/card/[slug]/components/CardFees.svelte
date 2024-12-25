<script lang="ts">
    import { parseDatabaseString } from "$lib/functions";
    import { COP, type ModifiedCardObject } from "$lib/types";
    export let card:ModifiedCardObject;

    
</script>

{#if card.card_af || card.card_ftf || card.card_btf || card.card_apr || card.card_caf || card.card_lpf}
<div id="physical" class="lg:mb-8 p-6 shadow-all-xl dark:shadow-theme-shadow-dark lg:rounded-2xl flex flex-col items-center ">
    <div class="text-3xl mb-8">Fees</div>
        <table class="my-2 w-full">
            {#if card.card_af || card.card_af == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Annual Fee</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_af)}</td>
            </tr>
            {/if}
            {#if card.card_ftf || card.card_ftf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Foreign Transaction Fee</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_ftf)}</td>
            </tr>
            {/if}
            {#if card.card_btf || card.card_btf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Balance Transfer Fee</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_btf)}</td>
            </tr>
            {/if}
            {#if card.card_lpf || card.card_lpf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Late Payment Fee</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_lpf)}</td>
            </tr>
            {/if}
            {#if card.card_apr || card.card_apr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">APR</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_apr)}</td>
            </tr>
            {/if}
            {#if card.card_caf || card.card_caf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Cash Advance Fee</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_caf)}</td>
            </tr>
            {/if}
            {#if card.card_caapr || card.card_caapr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Cash Advance APR</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_caapr)}</td>
            </tr>
            {/if}
            {#if card.card_btapr || card.card_btapr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Balance Transfer APR</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_btapr)}</td>
            </tr>
            {/if}
            {#if card.card_lpapr || card.card_lpapr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-theme-text-white">Late Payment APR</td>
                <td class="p-4 text-center border-b border-theme-text-white">{parseDatabaseString(card, COP.card_lpapr)}</td>
            </tr>
            {/if}
            {#if card.card_auc || card.card_auc == 0}
            <tr>
                <td class="p-4 text-center border-r border-theme-text-white">Authorized User Cost</td>
                <td class="p-4 text-center border-theme-text-white">{parseDatabaseString(card, COP.card_auc)}</td>
            </tr>
            {/if}
        </table>
        <div class="text-xs">*Some Fees May Not Be Listed</div>
    </div>
    {/if}

    <style>
        table {
            border-collapse: separate !important;
        }
    </style>