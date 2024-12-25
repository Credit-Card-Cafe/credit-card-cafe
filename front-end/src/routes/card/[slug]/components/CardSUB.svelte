<script lang="ts">
    import type { ModifiedCardObject } from "$lib/types";
    import { redemption } from "$lib/fields";
    export let card:ModifiedCardObject;
</script>

{#if card.card_subv}
    <div id="physical" class="p-6 shadow-all-xl dark:shadow-theme-shadow-dark lg:rounded-2xl flex flex-col items-center ">
        <div class="text-3xl mb-8">Sign-up Bonus:</div>
        {card.card_subv.toLocaleString()}{#if card.card_redemption}{redemption[card.card_redemption]} bonus {card.card_redemption}{/if} if you spend ${card.card_subq?.toLocaleString()} in {card.card_subt} months. 
    </div>
{/if}
