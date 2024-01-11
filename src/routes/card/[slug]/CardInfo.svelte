<script>
    export let card;
    import { lists, dataField } from "../../../lib/fields";

    let obj = "fees";
    
</script>

<div id="cardInfo">
    <div id="intro" class="mb center">
        <div class="large underline">At a Glance:</div>
        <p>A {#if card.brand}{card.brand}{/if} {card.bank} Credit Card, with
        {#if card.annual_fee && card.annual_fee != 0}a ${card.annual_fee} Annual Fee.{:else if card.annual_fee == 0}no Annual Fee.{/if}
        {#if card.redemption} This card earns {card.redemption} on purchases (check "Rewards" below for categories).{/if}
        {#if card.link}<a href={card.link}>Apply to the card here</a>{/if}
        </p>
        <p>This card is issued 
            {#if Object.hasOwn(card, "bank") && !Object.hasOwn(card, "brand")}
            by {card.bank} 
            {:else if Object.hasOwn(card, "bank") && Object.hasOwn(card, "brand")}
            and {card.brand}
            {/if}
            {#if Object.hasOwn(card, "network")}
                through the {card.network} Network 
            {/if}
            {#if Object.hasOwn(card, "consumer")}
                for {#if card.consumer == "Student"} Students{:else if card.consumer == "Business"} Businesses{:else} Personal Use{/if}{/if}.</p>
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
    
    {#if card[obj]}
    <div id="fees" class="mb">
        <div class="large">{dataField[obj].name}</div>
        <table>
            {#each Object.keys(dataField[obj]["data"]) as field}
                {#if Object.hasOwn(card[obj], field)}
                    <tr>
                        <td>{dataField[obj]["data"][field].name}</td>
                        <td>{#if card[obj][field] == 0}No {dataField[obj]["data"][field].name}
                            {:else if dataField[obj]["data"][field].unit == "$"}
                                ${card[obj][field]}
                            {:else}
                                {card[obj][field]}{dataField[obj]["data"][field].unit}
                            {/if}
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
        <div class="small">*Some Fees May Not Be Listed</div>
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

    {#if card.link}
        <div><a href={card.link}>Apply to the card here</a></div>
    {/if}
</div>

<style>
    tr,td {
        padding: 1rem;
    }
    table {
        border: 1px solid black;
        border-radius: 5px;
    }
    table > tr:nth-child(even) > td {
        border-top: 1px solid black;
    }
    tr > td:nth-child(2) {
        border-left: 1px solid black;
    }
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .large {
        font-size: 2rem;
    }
    .small {
        font-size: 0.75rem;
    }
    .underline {
        text-decoration: underline;
    }
    .mb {
        margin-bottom: 2rem;
    }
    #cardInfo {
        margin-top: 1rem;
        padding: 1rem;
    }
    @media (min-width: 768px) {
        #cardInfo {
            margin-left: 20rem;
            margin-right: 20rem;
            margin-top: 5rem;
            display: flex;
            flex-direction: column;
        }
}
</style>