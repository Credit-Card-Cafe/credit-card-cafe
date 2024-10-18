<script lang="ts">
    import { type ModifiedCardObject } from "$lib/types";
    import { dataField } from "$lib/fields";
    export let card:ModifiedCardObject;
    
</script>

{#if card.card_material || card.card_weight || card.card_embossed || card.card_chip || card.card_il || card.card_ttp}
    <div id="physical" class="mb-8 lg:p-6">
        {#if card.card_material}
        Material: {card.card_material}
        {/if}
        {#if card.card_weight}
        Material: {card.card_weight}
        {/if}
        {#if card.card_embossed}
        Material: {card.card_embossed}
        {/if}
        {#if card.card_chip}
        Material: {card.card_chip}
        {/if}
        {#if card.card_il}
        Material: {card.card_il}
        {/if}
        {#if card.card_ttp}
        Material: {card.card_ttp}
        {/if}
    </div>
    {/if}