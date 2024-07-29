<script lang="ts">
    import type { CreditCardType, RewardSet, UserType } from "$lib/types";
    export let cards:CreditCardType[];
    export let title: "Your" | "Potential";
    import { redemption } from "$lib/fields";
    import Reward from "./Reward.svelte";

    export let localUser:UserType;

    let categories:{[Key: string]:Array<RewardSet>} = {}
    
    cards.forEach(card => { 
        if (card.rewards && card.redemption) {
            for (let reward in card.rewards) {
                if (reward != "custom") {
                    if (!categories[reward]) {
                        categories[reward] = []
                    }
                    //categories[reward].push(card)
                    categories[reward].push({
                        "card": card,
                        "value":card.rewards[reward].toString() + redemption[card.redemption],
                        "custom": false
                    })
                }
            }
        } 
        if (card.custom_rewards && card.redemption && localUser?.custom_choices) {
            let userCard = localUser.custom_choices.find((choice: { [x: string]: any; }) => choice[card.id])
            for (let reward in card.custom_rewards) {
                if (userCard && reward == userCard[card.id]) {
                    if (!categories[reward]) {
                        categories[reward] = []
                    }
                    categories[reward].push({
                        "card": card,
                        "value":card.custom_rewards[reward].toString() + redemption[card.redemption],
                        "custom": true
                    })
                }
            }
        }
    });

    let sortedKeys: string[] = Object.keys(categories).sort((a, b) => {
        return categories[b].length - categories[a].length;
    });


</script>

{#if Object.keys(categories).length > 0}
    <div class="dark:text-white-warm">
        <div class="text-xl text-center md:text-center mb-8 md:mb-0">{title} Rewards:</div>
        <div class="text-sm mb-8 text-center md:text-center hidden md:block">Click boxes to reveal</div>
        <ul class="flex md:flex-row flex-col md:flex-wrap">
            {#each sortedKeys as category}
                <li>
                    <Reward categories={categories} category={category}></Reward>
                </li>
            {/each}
        </ul>
    </div>
{/if}
