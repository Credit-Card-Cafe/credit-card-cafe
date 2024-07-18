<script lang="ts">
  import { getOneCardByID } from "$lib/database/read";
  import { CardNetwork, type CreditCardType } from "$lib/types";
  import IntersectionObserver from "components/IntersectionObserver.svelte";
  import "./global.css";
  import CreditCard from "components/CreditCard.svelte";
  import { onMount } from "svelte";
  import { categories } from "$lib/cardLists";
    import { goto } from "$app/navigation";

  let loadingCard:CreditCardType = {
      id: "null",
      url: "null",
      bank_id: "null",
      name: "Loading...",
      network: CardNetwork.None
  }
  

  onMount(() => {
    document.addEventListener("scroll", (e) => {
      document.getElementById("scrollBouncy")!.style.opacity = `${(100-window.scrollY)/100}`
    });
  });

</script>

<div id="home" class="dark:text-white-warm pt-16 group">
  <div class="mb-96 mt-10">
    <div class="text-6xl md:text-8xl text-green-500 font-semibold text-center">CreditCardDB</div>
    <div class="text-3xl md:text-6xl font-semibold text-center">the <magic>ultimate</magic> credit card research tool</div>
  </div>
  <div id="scrollBouncy" class="text-xl font-semibold text-center absolute bottom-4 left-0 right-0 mx-auto group-hover:animate-bounce">Scroll to explore cards!</div>
  {#each categories as category}
    <div class="bg-gradient-to-t from-green-100 dark:from-green-700 to-alt dark:to-main-gray to-80%">
      <button on:click={() => goto(`/table/${category.id}`)} class="block p-4 text-2xl text-center shadow rounded-md bg-black/[0.05] dark:bg-white/[0.05] mb-2 lg:mb-4 mx-auto mb-2 w-11/12 lg:w-1/2 hover:bg-black/[0.3] transition-all">{category.title}</button>
      <div class="flex flex-col md:flex-row md:gap-16 p-10 pb-14 mb-16 md:overflow-x-auto md:overscroll-x-auto">
        {#each category.list as cardID}
        <IntersectionObserver once={true} let:intersecting={intersecting}>
          {#if intersecting}
            {#await getOneCardByID(cardID)}
              <CreditCard card={loadingCard} scale={90}></CreditCard>
            {:then promisedCard} 
              <CreditCard card={promisedCard} scale={90} showTrackCard={true}></CreditCard>
            {/await}
          {/if}
        </IntersectionObserver>
        {/each}
      </div>
    </div>
  {/each}
</div>

<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>
