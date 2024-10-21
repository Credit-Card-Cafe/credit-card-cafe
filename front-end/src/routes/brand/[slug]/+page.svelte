<script lang="ts">
  import CreditCard from 'global-components/CreditCard.svelte';
  export let data;
  import CardStack from 'global-components/CardStack.svelte';
  import BrandInfo from './components/BrandInfo.svelte';
  let brand = data.brand;
  let creditCards = data.creditCards;
  
</script>

<svelte:head>
  {#if brand}
    <title>Credit Card Cafe | {brand.brand_name}</title>
    <meta name="description" content="{brand.brand_name} on CreditCardDB">
  {/if}
</svelte:head>

{#if brand}
  <main id="brand" class="flex flex-col items-center md:block">
    <div class="mb-12"><BrandInfo brand={brand}></BrandInfo></div>
    {#if creditCards}
      <div class="block md:hidden"><CardStack cards={creditCards} showTrackCard={true} allowCardFanning={false}></CardStack></div>
      <div class="hidden md:block lg:grid grid-cols-1 gap-4 justify-center pt-8 md:grid-cols-2 md:gap-12 lg:gap-6 lg:grid-cols-3">
            {#each creditCards as card}<CreditCard card={card} showTrackCard={true}></CreditCard>{/each}
      </div>
    {/if}
    </main>
{:else}
  <main>Nothing to display here...</main>
{/if}

