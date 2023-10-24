<script lang="js">
  import CreditCard from '../../../components/CreditCard.svelte';
  export let data;
  import { getOne } from '../../../lib/firebase.js';
  import { user, headerColor, oneCard } from '../../../lib/stores';
  import CardInfo from './CardInfo.svelte';

  let card = {
    name: "CreditCardDB",
    bank: "Bank of Ben",
    network: "Loading...",
    color: "253,248,244"
  }

  getOne(data.slug).then((result) => {
    card = result;
    headerColor.set("rgba(" + result.color + ",0.13)");
  });

</script>

<svelte:head>
    <title>CreditCardDB | {card.bank} - {card.name}</title>
</svelte:head>

{#if card}
  <div>
    <CreditCard card={card} --color="{card.color}"></CreditCard>
    <CardInfo card={card}></CardInfo>
    {#if $user}
      <a href="/contribute/update/{card.url}">Update Information</a>
    {/if}
</div>
{:else}
  <div>Credit Card not found</div>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>