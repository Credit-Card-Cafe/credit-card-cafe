<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>

<script lang="ts">
  import "./global.css";
  import CreditCard from "components/CreditCard.svelte";
  import { getOne } from "$lib/firebase";
  import type { CreditCardType } from "$lib/types";

  let featured = [
    {
      card: "the-nature-conservancy-customized-cash-rewards",
      desc: "<h1><b>The Nature Conservancy Customized Cash Rewards</b></h1><hr>The reason for this card's presence on Featured Card's is due to its philantropic properties. While using this card, Bank of America donates $0.05 for every $100 spent. While that doesn't seem like much, with many people spending much greater than $100/month, the donation can quickly add up.<br><br>Additionally, this card mirrors the properties of the Bank of America Customized Cash Rewards card, which rewards the card owner with <ul><li>3% Cash Back of their spending on a category of their choice</li><li>2% Cash Back at Grocery or Warehouse stores</li><li>1% on everything else.</li></ul><br>Keep in mind that the non-1% categories are only up to $2500 quarterly. The choice categories are of the following 6, and you can modify your choice once per billing cycle; Gas / EV Chargers, Online Shopping, Travel, Home Improvement, Restaurants / Dining, and Drug Stores.<br><br>Lastly, owners who bank with Bank of America or invest with Merrill-Lynch can recieve multipliers on their credit cards if their 3-month average account worth (combined between the two institutions) is above a certain threshold. Owners will recieve a 25% bonus multiplier with an account worth above $20,000; a 50% bonus multiplier with an account worth above $50,000; and a 75% bonus multiplier with an account worth above $100,000. For this card specifically, owners with a combined account worth greater than $100,000 would see 5.25% Cash Bank on the chosen category, 3.5% Cash Back on Grocery / Wholesale, and 1.75% Cash Back on everything else.  "
    },
  ]

</script>

<div id="home" class="dark:text-white-warm md:pt-16 px-8">
  <div class="pb-12 text-4xl text-center">Welcome to Credit Card DB</div>
  <div class="pb-8 text-2xl text-center">Featured Cards:</div>
  {#each featured as feature, i}
    {#await getOne(feature.card)}
      <div id="creditCard" class="creditCard bg-alt dark:bg-main-gray shadow-2xl shadow-stone-400 dark:shadow-stone-900"></div>
    {:then card}
      <div class="flex lg:odd:flex-row lg:even:flex-row-reverse flex-col lg:justify-between items-center lg:items-start border-2 border-green-500 lg:px-12 mb-12 last:mb-0 rounded-2xl py-12">
        <CreditCard card={card}></CreditCard>
        <div class="mx-8 md:mt-0 mt-4 z-10">{@html feature.desc}</div>
      </div>
    {/await}
  {/each}
</div>

