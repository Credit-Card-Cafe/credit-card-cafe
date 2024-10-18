<script lang="ts">
    import type { ModifiedCardObject } from "$lib/types";
    export let card:ModifiedCardObject;

    
</script>

{#if card.card_af || card.card_ftf || card.card_btf || card.card_apr || card.card_caf || card.card_lpf}
    <div id="fees" class="mb-8">
        <div class="text-3xl mb-4">Fees</div>
        <table class="my-2 w-full">
            {#if card.card_af || card.card_af == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Annual Fee</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_af}</td>
            </tr>
            {/if}
            {#if card.card_ftf || card.card_ftf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Foreign Transaction Fee</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_ftf}</td>
            </tr>
            {/if}
            {#if card.card_btf || card.card_btf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Balance Transfer Fee</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_btf}</td>
            </tr>
            {/if}
            {#if card.card_lpf || card.card_lpf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Late Payment Fee</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_lpf}</td>
            </tr>
            {/if}
            {#if card.card_apr || card.card_apr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">APR</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_apr}</td>
            </tr>
            {/if}
            {#if card.card_caf || card.card_caf == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Cash Advance Fee</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_caf}</td>
            </tr>
            {/if}
            {#if card.card_caapr || card.card_caapr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Cash Advance APR</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_caapr}</td>
            </tr>
            {/if}
            {#if card.card_btapr || card.card_btapr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Balance Transfer APR</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_btapr}</td>
            </tr>
            {/if}
            {#if card.card_lpapr || card.card_lpapr == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Late Payment APR</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_lpapr}</td>
            </tr>
            {/if}
            {#if card.card_auc || card.card_auc == 0}
            <tr>
                <td class="p-4 text-center border-r border-b border-white-warm">Authorized User Cost</td>
                <td class="p-4 text-center border-b border-white-warm">{card.card_auc}</td>
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