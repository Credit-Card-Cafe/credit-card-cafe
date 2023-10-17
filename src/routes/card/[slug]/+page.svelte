<script lang="js">
  import CreditCard from '../../../components/CreditCard.svelte';
  export let data;
</script>

<svelte:head>
    <title>CreditCardDB | {data.card.bank} - {data.card.name}</title>
</svelte:head>

{#if data.card}
  <CreditCard card={data.card} --color="{data.card.color}"></CreditCard>
  <a href="/contribute/update/{data.card.url}">Update Information</a>
{:else}
  <div>Credit Card not found</div>
{/if}