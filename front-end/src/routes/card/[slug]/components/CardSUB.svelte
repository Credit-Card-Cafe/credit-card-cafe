<script lang="ts">
    import type { ModifiedCardObject } from "$lib/types";
    import { redemption } from "$lib/fields";
    export let card:ModifiedCardObject;
</script>

{#if card.card_subv}
    <div id="physical" class="mb-8 lg:p-6">
        <div class="text-3xl mb-4">Sign-up Bonus:</div>
        {card.card_subv}{#if card.card_redemption}{redemption[card.card_redemption]} bonus {card.card_redemption}{/if} if you spend ${card.card_subq} in {card.card_subt} months. 
    </div>
{/if}
