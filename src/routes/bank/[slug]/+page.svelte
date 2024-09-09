<script lang="ts">
  import CreditCard from 'components/CreditCard.svelte';
  export let data;
  import CardStack from '../../../components/CardStack.svelte';
  import BankInfo from './components/BankInfo.svelte';

  let bank = data.bank;
  let cards = data.cards;
  
</script>

<svelte:head>
  {#if bank}
    <title>Credit Card Cafe | {bank.name}</title>
    <meta name="description" content="{bank.name} on CreditCardDB">
  {/if}
</svelte:head>

{#if bank}
  <div id="bank" class="flex flex-col mt-16 items-center md:block">
    <div class="mb-12"><BankInfo bank={bank}></BankInfo></div>
    {#if cards}
      <div class="block md:hidden"><CardStack cards={cards} showTrackCard={true} allowCardFanning={false}></CardStack></div>
      <div class="hidden md:block lg:grid grid-cols-1 gap-4 justify-center pt-8 md:grid-cols-2 md:gap-12 lg:gap-6 lg:grid-cols-3">
            {#each cards as item}<CreditCard card={item} showTrackCard={true}></CreditCard>{/each}
      </div>
    {/if}
  </div>
{:else}
  <div>Nothing to display here...</div>
{/if}

