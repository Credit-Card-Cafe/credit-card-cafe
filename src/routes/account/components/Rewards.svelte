<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let cards:Array<CreditCardType>;
    export let title: "Your" | "Potential";
    import { lists } from "../../../lib/fields";
    console.log(cards)

    function acronymitize(card: CreditCardType) {
        let delWords = ["credit", "card", "union", "bank","federal","the","visa","signature"]
        if (card.name) {
            return card.name.split(" ").map((word) => {
                if (!delWords.includes(word.toLowerCase())) {
                    return word[0]}
            }).join('');
        }
    }

    //let cardsWithRewards = cards.filter((card)).map((card) => )


</script>

<div class="rewards dark:text-white-warm">
    <div class="text-xl mb-8 text-center md:text-left">{title} Rewards:</div>
        <ul>
            {#each cards as card}
                {#if card.rewards}
                    {#each Object.keys(card.rewards) as reward}
                        {#if card.redemption}
                            {#if card.redemption == "Cash Back"}
                                <li>({acronymitize(card)}) {card.rewards[reward]}% {card.redemption} on {lists.rewardCategories[reward]} purchases</li>
                            {:else}
                                <li>({acronymitize(card)}) {card.rewards[reward]}x {card.redemption} on {lists.rewardCategories[reward]} purchases</li>
                            {/if}
                        {:else}
                            <li>{card.rewards[reward]}x {lists.rewardCategories[reward]}</li>
                        {/if}
                    {/each}
                {/if}
            {/each}
        </ul>
    </div>
