<script lang="ts">
    import { type ModifiedCardObject } from "$lib/types";
    import { lists, redemption } from "$lib/fields";
    import { beforeUpdate } from "svelte";
    export let card:ModifiedCardObject;
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";
    

    $: localUser = convertJSONtoUser($localUserData);

    let custom = false;
    let userCustomChoice = "";
    beforeUpdate(() => {
        if (card.card_rewards && Object.keys(card.card_rewards).indexOf("custom") > -1) {
            custom = true;
            if (localUser.custom_choices && card.card_custom) {
                let userReward = localUser.custom_choices.find((choice) => card.card_id && choice[card.card_id])
                for(let reward in card.card_custom) {
                    if (userReward && card.card_id && reward == userReward[card.card_id]) {
                        userCustomChoice = reward
                    }
                }
            }
        }
    })

    function setCustomReward(choice: string) {
        if (card.card_id) {
            let pushObj = {[card.card_id]:choice};
            if (localUser.custom_choices) {
                let userRewardIndex = localUser.custom_choices.findIndex((choice) => card.card_id && choice[card.card_id])
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
    }

    let showCustomRewards = false;
    let showDefaultRewards = true;

</script>

{#if card.card_rewards}
    <div class="p-6 shadow-all-xl dark:shadow-theme-shadow-dark lg:rounded-2xl flex flex-col items-center col-span-2">

        <div class="text-3xl mb-8">Rewards</div>
        <div class="my-2 lg:my-0 flex flex-row justify-start flex-wrap">
            {#if custom && card.card_custom}
                <button on:click={() => showCustomRewards = !showCustomRewards} class="m-1 lg:m-2 p-2 bg-black/[0.1] rounded-md text-center border border-theme-text-white hover:border-theme-green hover:bg-black/[0.4] transition-all">{#if showCustomRewards}Hide{:else}Show{/if} Custom Rewards Options</button>
                {#if showCustomRewards}
                    <div class="flex flex-col">
                        {#each Object.keys(card.card_custom) as reward}
                            <button class={(userCustomChoice == reward) ? "outline outline-theme-green m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center" : "custom_rewards" } on:click={() => setCustomReward(reward)}>
                                <div class="border border-theme-text-white rounded-md p-2 dark:bg-main-gray bg-alt dark:text-theme-text-white text-center mr-4">
                                    {#if card.card_redemption} 
                                        {card.card_custom[reward]}{redemption[card.card_redemption]}
                                    {:else}
                                        {card.card_custom[reward]}x
                                    {/if}
                                </div>
                                <div class="rounded-md mb-0">{lists.rewardCategories[reward]}</div>
                                {#if userCustomChoice==reward}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-theme-green mx-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                <div>Selected Custom Reward</div>                                  
                                {/if}
                            </button>
                        {/each}
                    </div>
                {:else if userCustomChoice}
                    <button class="m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-row items-center">
                        <div class="border border-theme-text-white rounded-md p-2 dark:bg-main-gray bg-alt dark:text-theme-text-white text-center mr-4">
                            {#if card.card_redemption} 
                                {card.card_custom[userCustomChoice]}{redemption[card.card_redemption]}
                            {:else}
                                {card.card_custom[userCustomChoice]}x
                            {/if}
                        </div>
                        <div class="rounded-md mb-0">{lists.rewardCategories[userCustomChoice]}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-theme-green mx-2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        <div>Selected Custom Reward</div>                                  
                    </button>
                {/if}
            {/if}
            {#each Object.keys(card.card_rewards) as reward}
                {#if reward != "custom"}
                    <div class="m-2 py-2 px-4 border border-theme-text-white rounded-md inline-flex flex-row items-center justify-between gap-x-2">
                        <div class="rounded-md dark:bg-main-gray dark:text-theme-text-white text-center">
                            {#if card.card_redemption} 
                                {card.card_rewards[reward]}{redemption[card.card_redemption]}
                            {:else}
                                {card.card_rewards[reward]}x
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

