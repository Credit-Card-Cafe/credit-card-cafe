<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    import { redemption } from "$lib/fields";
    export let card:CreditCardType;
</script>

{#if card.sub}
    <div id="physical" class="mb-8 lg:p-6">
        <div class="text-3xl mb-4">Sign-up Bonus:</div>
        {card.sub.sub_reward}{#if card.redemption}{redemption[card.redemption]} bonus {card.redemption}{/if} if you spend ${card.sub.sub_quota} in {card.sub.sub_months} months. 
    </div>
{/if}