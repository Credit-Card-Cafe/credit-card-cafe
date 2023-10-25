<script>
    export let card;
    import { lists, dataField } from "../../../lib/fields";
</script>

<div id="cardInfo">
    <div id="intro" class="mb center">
        <div class="large underline">At a Glance:</div>
        <div>A {#if card.brand}{card.brand}{/if} {card.bank} Credit Card, with
        {#if card.annual_fee && card.annual_fee != 0}a ${card.annual_fee} Annual Fee.{:else if card.annual_fee == 0}<div class="box">No Annual Fee.</div>{/if}
        {#if card.redemption} This card earns {card.redemption} on purchases (check "Rewards" below for categories).{/if}
        </div>
    </div>
    {#if card.rewards}
    <div id="rewards" class="mb">
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
    {#if card.physical}
    <div id="physical" class="mb">
        <div class="large">Physical Properties:</div>
        <ul>
        {#if card.physical.material}<li>Material: {card.physical.material}</li>{/if}
        {#if card.physical.embossed == "Yes"}<li>Embossed Name</li>{/if}
        {#if card.physical.tap_to_pay == "Yes"}<li>Tap-to-pay enabled</li>{/if}
        {#if card.physical.chip == "Yes"}<li>Features a Chip</li>{/if}
        {#if card.physical.info_location}
        <li>
            {#if card.physical.info_location == "Front"}
                Information Displayed on the Front
            {:else if card.physical.info_location == "Back"}
                Information Displayed on the Back
            {:else if card.physical.info_location == "Both"}
                Information Displayed on Back and Front
            {/if}
        </li>
        {/if}
        </ul>
    </div>
    {/if}
</div>

<style>
    .mb {
        margin-bottom: 2rem;
    }
    #cardInfo {
        width: max-content;
        margin-top: 5rem;
        display: flex;
        flex-direction: column;
    }
    .center {
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