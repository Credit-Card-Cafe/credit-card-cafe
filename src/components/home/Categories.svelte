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
      name: "Loading...",
      network: CardNetwork.None
  }
</script>

{#each categories as category}
    <div class="pt-20 md:pt-0 bg-gradient-to-t from-green-100 dark:from-green-700 to-alt dark:to-main-gray to-80% md:min-h-[calc(100vh-4rem)] flex flex-col justify-evenly md:snap-end">
      <div class="text-3xl md:text-6xl font-semibold text-center">{category.title}</div>
      <button on:click={() => goto(`/table/${category.id}`)} class="block px-8 py-4 text-2xl text-center shadow rounded-md bg-black/[0.1] dark:bg-white/[0.05] mx-auto w-11/12 md:w-auto hover:bg-black/[0.3] transition-all">go to table
        
      </button>
      <div class="flex flex-col md:flex-row md:gap-16 p-4 md:snap-x md:snap-mandatory md:overflow-x-auto md:overscroll-x-auto">
        {#each category.list as cardID}
        <IntersectionObserver once={true} let:intersecting={intersecting}>
          {#if intersecting}
            <div class="md:snap-center md:snap-always">
            {#await getOneCardByID(cardID)}
              <CreditCard card={loadingCard} scale={90}></CreditCard>
            {:then promisedCard} 
              <CreditCard card={promisedCard} scale={90} showTrackCard={true}></CreditCard>
            {/await}
            </div>
          {/if}
        </IntersectionObserver>
        {/each}
      </div>
    </div>
  {/each}