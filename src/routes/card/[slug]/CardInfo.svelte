<script>
    export let card;
    import { lists } from "../../../lib/fields";
</script>

<div id="cardInfo">
    <div id="intro">
        <div class="large underline">At a Glance:</div>
        {#if card.annual_fee != undefined && card.annual_fee != 0}<div class="box">${card.annual_fee} Annual Fee</div>{:else if card.annual_fee != undefined &&card.annual_fee == 0}<div class="box">No Annual Fee</div>{/if}
    </div>
    {#if card.rewards}
    <div id="rewards">
        <div class="large">Rewards:</div>
        <ul>
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
        </ul>
    </div>
    {/if}
</div>

<style>
    #cardInfo {
        width: max-content;
        margin-top: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .large {
        font-size: 2rem;
    }
    .underline {
        text-decoration: underline;
    }
</style>