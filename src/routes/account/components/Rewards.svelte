<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let cards:Array<CreditCardType>;
    export let title: "Your" | "Potential";
    import { lists, redemption } from "$lib/fields";
    import CreditCard from "components/CreditCard.svelte";

    interface RewardSet {
    card: CreditCardType,
    value: string,
}

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
                        "value":card.rewards[reward].toString() + redemption[card.redemption]
                    })
                }
            }
        }
    });

</script>

<div class="rewards dark:text-white-warm">
    <div class="text-xl mb-8 text-center md:text-left">{title} Rewards:</div>
    <ul>
        {#each Object.keys(categories) as category}
            <li class="border border-black dark:border-white-warm p-2 rounded-lg mb-4 mx-1 flex flex-col">
                {lists.rewardCategories[category]}
                <span class="my-2 flex flex-row justify-start flex-wrap">
                    {#each categories[category] as reward}
                        <span class="m-2 p-2 bg-black/[0.1] rounded-md inline-flex flex-col items-center hovertip relative">
                            <span class="h-8 w-12 rounded-md mb-1" style="background:rgb({reward.card.color})"></span>
                            <span class="hovertext border border-white-warm rounded-md p-2 absolute bottom-full z-10 dark:bg-main-gray bg-alt dark:text-white-warm text-center">{reward.card.bank} - {reward.card.name}</span>
                            {reward.value}
                        </span>
                    {/each}
                </span>
            </li>
        {/each}
    </ul>
</div>

<style>
    .hovertip .hovertext {
      visibility: hidden;
    }
    
    .hovertip:hover .hovertext {
      visibility: visible;
    }
</style>