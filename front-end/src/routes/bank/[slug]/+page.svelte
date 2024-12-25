<script lang="ts">
  import CreditCard from 'global-components/CreditCard.svelte';
  export let data;
  import CardStack from 'global-components/CardStack.svelte';
  import BankInfo from './components/BankInfo.svelte';

  let bank = data.bank;
  let creditCards = data.creditCards;
  
</script>

<svelte:head>
  {#if bank}
    <title>Credit Card Cafe | {bank.bank_name}</title>
    <meta name="description" content="{bank.bank_name} on CreditCardDB">
  {/if}
</svelte:head>

{#if bank}
  <main id="bank" class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col items-center md:block">
    <div class="mb-12"><BankInfo bank={bank}></BankInfo></div>
    {#if creditCards}
      <div class="flex flex-col lg:grid gap-4 justify-center pt-8 gap-6 grid-cols-3">
            {#each creditCards as card}<CreditCard card={card} showTrackCard={true}></CreditCard>{/each}
      </div>
    {/if}
  </main>
{:else}
  <main>Nothing to display here...</main>
{/if}

