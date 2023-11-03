<script>
    export let cards;
    export let person;
    import { lists } from "../../../lib/fields";
    console.log(cards)
</script>

<div class="rewards">
    <div class="title">{person} Rewards:</div>
        <ul>
            {#each cards as card}
            {#if card.rewards}
                {#each Object.keys(card.rewards) as reward}
                {#if card.redemption}
                    {#if card.redemption == "Cash Back"}
                        <li>{card.rewards[reward]}% {card.redemption} on {lists.rewardCategories[reward]} purchases</li>
                    {:else}
                        <li>{card.rewards[reward]}x {card.redemption} on {lists.rewardCategories[reward]} purchases</li>
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
  }
</style>