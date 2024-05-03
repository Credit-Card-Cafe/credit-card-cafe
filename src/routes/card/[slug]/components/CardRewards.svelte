<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    import { lists, redemption } from "$lib/fields";
    import { beforeUpdate } from "svelte";
    export let card:CreditCardType;
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";

    $: localUser = convertJSONtoUser($localUserData);
    
    let custom = false;
    let userCustomChoice = "";
    beforeUpdate(() => {
        if (card.rewards && Object.keys(card.rewards).indexOf("custom") > -1) {
            custom = true;
            if (localUser.custom_choices && card.custom_rewards) {
                let userCard = localUser.custom_choices.find((choice) => choice[card.id])
                for(let reward in card.custom_rewards) {
                    if (userCard && reward == userCard[card.id]) {
                        userCustomChoice = reward
                    }
                }
            }
        }
    })

    let showCustomRewards = false;
    let showDefaultRewards = true;
</script>

{#if card.rewards}
    <div class="mb-8 lg:p-6">
        <div class="text-3xl mb-4">Rewards</div>
        <div class="my-2 lg:my-0 flex flex-col justify-start flex-wrap">
            {#if custom && card.custom_rewards}
                <button on:click={() => showCustomRewards = !showCustomRewards} class="m-1 lg:m-2 p-2 bg-black/[0.1] rounded-md text-center border border-white-warm hover:border-green-500 hover:bg-black/[0.4] transition-all">{#if showCustomRewards}Hide{:else}Show{/if} Custom Rewards Options</button>
                {#if showCustomRewards}
                    <div class="flex flex-col">
                        {#each Object.keys(card.custom_rewards) as reward}
                            <div class={(userCustomChoice == reward) ? "border-4 border-green-500 m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center" : "custom_rewards" }>
                                <div class="border border-white-warm rounded-md p-2 dark:bg-main-gray bg-alt dark:text-white-warm text-center mr-4">
                                    {#if card.redemption} 
                                        {card.custom_rewards[reward]}{redemption[card.redemption]}
                                    {:else}
                                        {card.custom_rewards[reward]}x
                                    {/if}
                                </div>
                                <div class="rounded-md mb-0">{lists.rewardCategories[reward]}</div>
                            </div>
                        {/each}
                    </div>
                {/if}
            {/if}
            {#if custom}
                <button on:click={() => showDefaultRewards = !showDefaultRewards} class="m-1 lg:m-2 p-2 bg-black/[0.1] rounded-md text-center border border-white-warm hover:border-green-500 hover:bg-black/[0.4] transition-all">{#if showDefaultRewards}Hide{:else}Show{/if} Default Rewards</button>
            {/if}
            {#if showDefaultRewards}
                {#each Object.keys(card.rewards) as reward}
                    {#if reward != "custom"}
                        <div class="m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center">
                            <div class="border border-white-warm rounded-md p-2 dark:bg-main-gray bg-alt dark:text-white-warm text-center mr-4">
                                {#if card.redemption} 
                                    {card.rewards[reward]}{redemption[card.redemption]}
                                {:else}
                                    {card.rewards[reward]}x
                                {/if}
                            </div>
                            <div class="rounded-md mb-0">{lists.rewardCategories[reward]}</div>
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
    <hr>
    {/if}
   

<style>
    hr {
        margin: 2rem 0;
        border: 2px solid #d6c0a5;
    }
    .custom_rewards {
        @apply m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center;
    }
    .custom_rewards:hover {
        @apply bg-black/[0.4];
    }
</style>