<script lang="js">
  import CreditCard from '../../../components/CreditCard.svelte';
  export let data;
  import { user } from '../../../lib/stores';
</script>

<svelte:head>
    <title>CreditCardDB | {data.card.bank} - {data.card.name}</title>
</svelte:head>

{#if data.card}
  <CreditCard card={data.card} --color="{data.card.color}"></CreditCard>
  {#if $user}
  <a href="/contribute/update/{data.card.url}">Update Information</a>
  {/if}
{:else}
  <div>Credit Card not found</div>
{/if}