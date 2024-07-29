<script lang="ts">
    import { getOneCardByID } from "$lib/database/read";
    import IntersectionObserver from "components/IntersectionObserver.svelte";
    import CreditCard from "components/CreditCard.svelte";
    import { categories } from "$lib/cardLists";
    import { goto } from "$app/navigation";
    import { CardNetwork, type CreditCardType } from "$lib/types";

    let loadingCard:CreditCardType = {
      id: "null",
      url: "null",
      bank_id: "null",
      name: "the ultimate credit card research tool",
      bank: "CreditCardDB",
      network: "Loading..." as CardNetwork.None
  }
</script>

{#each categories as category}
    <div class="pt-20 md:pt-0 bg-gradient-to-t from-green-100 dark:from-green-700 to-alt dark:to-main-gray to-80% md:min-h-[calc(100vh-4rem)] flex flex-col justify-evenly md:snap-end">
      <div class="flex flex-col md:flex-row justify-between mx-16">
        <div class="text-3xl md:text-6xl font-semibold text-center">{category.title}</div>
        <button on:click={() => goto(`/table/${category.id}`)} class="block px-4 py-2 md:px-8 md:py-4 my-4 md:my-0 text-lg md:text-2xl text-center rounded-md md:mx-0 mx-auto hover:bg-black/[0.3] transition-all flex flex-row items-center">View Cards In Table
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>        
        </button>
      </div>
      <hr class="my-4 border-2 border-white-warm w-1/2 md:ml-16 mx-auto md:mx-0">
      <div class="flex flex-col md:flex-row md:gap-16 p-4 md:snap-x md:snap-mandatory md:overflow-x-auto md:overscroll-x-auto">
        {#each category.list as cardID}
        <IntersectionObserver once={true} let:intersecting={intersecting}>
          {#if intersecting}
            <div class="md:snap-center md:snap-always">
            {#await getOneCardByID(cardID)}
              <CreditCard card={loadingCard} scale={90} --color="212,212,212"></CreditCard>
            {:then promisedCard} 
              <CreditCard card={promisedCard} scale={90} showTrackCard={true}></CreditCard>
            {:catch}
              <CreditCard card={loadingCard} scale={90} --color="212,212,212"></CreditCard>
            {/await}
            </div>
          {/if}
        </IntersectionObserver>
        {/each}
      </div>
    </div>
  {/each}