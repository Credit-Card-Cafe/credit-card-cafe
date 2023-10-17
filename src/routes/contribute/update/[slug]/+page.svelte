<!-- Individual card update page-->
<script lang="js">
    import UpdateCard from './UpdateCard.svelte';
    export let data;
    import { user } from '../../../../lib/stores';
  </script>
  
<svelte:head>
    <title>CreditCardDB | Update Card | {data.card.bank} - {data.card.name}</title>
</svelte:head>

  {#if $user}
    {#if data.card}
      <UpdateCard card={data.card}></UpdateCard>
    {:else}
      <div>Credit Card not found. Would you like to create one?</div>
    {/if}
  {:else}
    <div>Please log in to update a card</div>
  {/if}