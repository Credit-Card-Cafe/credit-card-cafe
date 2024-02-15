<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    import { lists, redemption } from "$lib/fields";
    export let card:CreditCardType;
</script>

{#if card.rewards}
    <div class="mb-8 lg:p-6">
        <div class="text-3xl mb-4">Rewards</div>
        <div class="my-2 lg:my-0 flex flex-col justify-start flex-wrap">
            {#each Object.keys(card.rewards) as reward}
                <div class="m-1 lg:m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center">
                    <div class="border border-white-warm rounded-md p-2 dark:bg-main-gray bg-alt dark:text-white-warm text-center mr-4">
                        {#if card.redemption} 
                            {card.rewards[reward]}{redemption[card.redemption]}
                        {:else}
                            {card.rewards[reward]}x
                        {/if}
                    </div>
                    <div class="rounded-md mb-0">{lists.rewardCategories[reward]}</div>
                </div>
            {/each}
        </div>
    </div>
    {/if}