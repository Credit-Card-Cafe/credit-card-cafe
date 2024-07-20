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
                let userReward = localUser.custom_choices.find((choice) => choice[card.id])
                for(let reward in card.custom_rewards) {
                    if (userReward && reward == userReward[card.id]) {
                        userCustomChoice = reward
                    }
                }
            }
        }
    })

    function setCustomReward(choice: string) {
        let pushObj = {[card.id]:choice};
        if (localUser.custom_choices) {
            let userRewardIndex = localUser.custom_choices.findIndex((choice) => choice[card.id])
            if (userRewardIndex > -1) {
                localUser.custom_choices[userRewardIndex] = pushObj;
            } else {
                localUser.custom_choices.push(pushObj);
            }
        } else {
            localUser["custom_choices"] = [pushObj]
        }
        $localUserData = JSON.stringify(localUser)
    }

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
                            <button class={(userCustomChoice == reward) ? "outline outline-green-500 m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center" : "custom_rewards" } on:click={() => setCustomReward(reward)}>
                                <div class="border border-white-warm rounded-md p-2 dark:bg-main-gray bg-alt dark:text-white-warm text-center mr-4">
                                    {#if card.redemption} 
                                        {card.custom_rewards[reward]}{redemption[card.redemption]}
                                    {:else}
                                        {card.custom_rewards[reward]}x
                                    {/if}
                                </div>
                                <div class="rounded-md mb-0">{lists.rewardCategories[reward]}</div>
                                {#if userCustomChoice==reward}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-500 mx-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                <div>Selected Custom Reward</div>                                  
                                {/if}
                            </button>
                        {/each}
                    </div>
                {:else if userCustomChoice}
                    <button class="m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center">
                        <div class="border border-white-warm rounded-md p-2 dark:bg-main-gray bg-alt dark:text-white-warm text-center mr-4">
                            {#if card.redemption} 
                                {card.custom_rewards[userCustomChoice]}{redemption[card.redemption]}
                            {:else}
                                {card.custom_rewards[userCustomChoice]}x
                            {/if}
                        </div>
                        <div class="rounded-md mb-0">{lists.rewardCategories[userCustomChoice]}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-500 mx-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        <div>Selected Custom Reward</div>                                  
                    </button>
                {/if}
            {/if}
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
        </div>
    </div>
    {/if}
   

<style>
    .custom_rewards {
        @apply m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center;
    }
    .custom_rewards:hover {
        @apply bg-black/[0.4];
    }
</style>

