<script lang="js">
  import CreditCard from '../../../components/CreditCard.svelte';
  export let data;
  import { getOne } from '../../../lib/firebase.js';
  import { user } from '../../../lib/stores';

  let card = {
    name: "CreditCardDB",
    bank: "Bank of Ben",
    network: "Loading...",
    color: "0,0,0"
  }

  getOne(data.slug).then((result) => {
    card = result;
  });

</script>

<svelte:head>
    <title>CreditCardDB | {card.bank} - {card.name}</title>
</svelte:head>

{#if card}
  <CreditCard card={card} --color="{card.color}"></CreditCard>
  {#if $user}
  <a href="/contribute/update/{card.url}">Update Information</a>
  {/if}
{:else}
  <div>Credit Card not found</div>
{/if}