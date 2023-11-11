<script>
    export let cards;
    export let person;
    import { lists } from "../../../lib/fields";
    console.log(cards)

    function acronymitize(card) {
        let delWords = ["credit", "card", "union","bank","federal"]
        return card.name.split(" ").map((word) => {
            if (!delWords.includes(word.toLowerCase())) {
                return word[0]}
        }).join('');
    }
</script>

<div class="rewards">
    <div class="title">{person} Rewards:</div>
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

<style>
    .title {
        font-size: x-large;
        margin-bottom: 2rem;
        text-align: center;
    }
    @media (min-width: 768px) { 
        .title {
            text-align: left;
        }
    }
</style>