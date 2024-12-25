<script lang="ts">
    import type { ModifiedCardObject, RewardSet, UserType } from "$lib/types";
    export let cards:ModifiedCardObject[];
    import { redemption } from "$lib/fields";
    import Reward from "./Reward.svelte";
    import { getCachedImage } from "$lib/stores";

    export let localUser:UserType;

    let categories:{[Key: string]:Array<RewardSet>} = {}

    let totalAnnualFee = 0
    
    let lowestAPRCard = cards[0]
    
    cards.forEach(card => { 
        if (card.card_rewards && card.card_redemption) {
            for (let reward in card.card_rewards) {
                if (reward != "custom") {
                    if (!categories[reward]) {
                        categories[reward] = []
                    }
                    //categories[reward].push(card)
                    categories[reward].push({
                        "card": card,
                        "value":card.card_rewards[reward].toString() + redemption[card.card_redemption],
                        "custom": false
                    })
                }
            }
        } 
        if (card.card_custom && card.card_redemption && localUser?.custom_choices) {
            let userCard = localUser.custom_choices.find((choice: { [x: string]: any; }) => card.card_id && choice[card.card_id])
            for (let reward in card.card_custom) {
                if (card.card_id && userCard && reward == userCard[card.card_id]) {
                    if (!categories[reward]) {
                        categories[reward] = []
                    }
                    categories[reward].push({
                        "card": card,
                        "value":card.card_custom[reward].toString() + redemption[card.card_redemption],
                        "custom": true
                    })
                }
            }
        }
        if (card.card_af) {
            if (typeof card.card_af === "string") totalAnnualFee += parseInt(card.card_af)
            else totalAnnualFee+=card.card_af 
        }

    });

    let sortedKeys: string[] = Object.keys(categories).sort((a, b) => {
        return categories[b].length - categories[a].length;
    });


</script>

<div class="dark:text-white-warm basis-4/6">
    <div class="flex flex-col lg:flex-row justify-between items-center gap-x-6 pb-2">
        <div class="py-4 my-4 shadow-all-xl lg:my-0 border divide-x-2 divide-inherit w-full dark:shadow-theme-shadow-dark lg:rounded-md dark:border dark:border-theme-text-white border-x-0 lg:border-x flex flex-row items-start justify-evenly">
            <div class="text-xl flex flex-col items-center basis-1/2 text-center">Total Annual Fee {#if cards.length > 0}<span>${totalAnnualFee}</span>{/if}</div>
            <div class="text-xl flex flex-col items-center basis-1/2 text-center">Lowest APR Card {#if cards.length > 0}<img class="h-8 w-12 rounded-[0.15rem]" style="background-color:{lowestAPRCard.card_color}" src="../../storage/{lowestAPRCard.card_url}.jpeg" alt="{lowestAPRCard.card_name}">{/if}</div>
        </div>
    </div>
    {#if Object.keys(categories).length > 0}  
        <ul class="flex flex-row flex-wrap gap-4 px-4 mt-4">
            {#each sortedKeys as category}
                <li>
                    <Reward categories={categories} category={category}></Reward>
                </li>
            {/each}
        </ul>
    {/if}
</div>
