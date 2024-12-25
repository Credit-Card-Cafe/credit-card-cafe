<script lang="ts">
    import "./global.css";
    import CardStack from "global-components/CardStack.svelte";
    import DefaultCreditCard from "global-components/DefaultCreditCard.svelte";
    import { onMount } from "svelte";
    import { getOneCardByURL } from "./api/cards/cards";
    import { type CardObject } from "$lib/types";

    const cardsOnPage = ["amex-platinum","discover-it","amex-gold","penfed-platinum","bofa-pr","bofa-ccr","sapphire-preferred", "chase-freedom-unlimited","bofa-travel","chase-freedom-flex","chase-ink-unlimited"]
    const cardsInStackList = ["sapphire-preferred", "penfed-platinum", "bofa-pr"]
    let cardStackList:CardObject[] = []

    onMount(async () => {
      cardStackList = await Promise.all(
        cardsInStackList.map(url => getOneCardByURL(url))
      ).then(cards => cards.filter((card): card is CardObject => card !== null && card !== undefined));
    })
</script>

<main class="bg-theme-white dark:bg-theme-black lg:bg-gradient-to-tr from-theme-white dark:from-theme-black from-85% lg:from-65% to-theme-green dark:to-theme-green dark:text-theme-text-white overflow-hidden pb-0">
  <section>
    <div class="relative lg:absolute px-6 lg:pl-16 pt-10 z-40 w-full lg:pb-0 flex flex-col lg:block items-center justify-evenly">
      <h1 class="text-5xl lg:text-7xl lg:w-1/2 2xl:w-2/5 font-bold text-theme-green text-center lg:text-left">How well do you understand Credit Cards?</h1>
      <h2 class="text-xl lg:text-4xl lg:w-2/5 font-semibold text-center lg:text-left my-10">They're safer than cash or debit card, and may earn you rewards while shopping.</h2>
      <a href="/s/personalize-my-experience/" class="bg-theme-blue hover:bg-theme-blue-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center">Personalize my reccomendations</a>
    </div>
    <div class='cardGrid bg-gradient-to-t from-theme-green to-theme-white dark:to-theme-black pb-10 lg:bg-none lg:pt-8 z-0 grid grid-cols-8 justify-start content-start grid-flow-dense w-[90rem] scale-50 -translate-y-24 -mb-60 lg:mb-0 lg:transform-none gap-y-6'>
      {#each cardsOnPage as card, i}
        <div class={`fade col-span-2 
        before:bg-fixed before:absolute before:rounded-[0.65rem] before:bg-none lg:before:bg-gradient-to-r before:from-theme-white before:dark:from-theme-black before:from-[41%] before:to-transparent before:to-80% 
        ${i == 4 ? "col-start-2" : ""}`}>
          <img src="/storage/{card}.jpeg" alt="{card}" class="creditCard">
        </div>
      {/each}
    </div>
  </section>
  <section class="py-8 lg:py-24 2xl:py-48 px-12 gap-y-12 gap-x-24 bg-theme-white dark:bg-theme-black w-full flex flex-col lg:flex-row justify-center items-center">
    <DefaultCreditCard></DefaultCreditCard>
    <div class="flex flex-col items-center basis-3/5">
      <h1 class="text-4xl lg:text-6xl font-bold text-theme-green">The best resource for credit card discovery</h1>
      <h2 class="text-2xl lg:text-4xl font-semibold">Reccomended by CFA's*, trusted by over 250,000* users.</h2> 
    </div>
  </section>
  <section class="py-24 2xl:py-48 px-12 bg-theme-brown/[0.1] dark:bg-theme-darkgray w-full relative">
    <h1 class="text-4xl lg:text-6xl font-bold text-theme-green lg:w-1/2">Understanding credit cards has never been easier.</h1>
    <h2 class="text-2xl lg:text-4xl my-10 font-semibold lg:w-1/2">Your personalized card recommendations are just a click away.</h2>
    <a href="/s/personalize-my-experience/" class="bg-theme-blue hover:bg-theme-blue-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center">Personalize my reccomendations</a>
    <div class="lg:absolute right-[8vw] mt-8 lg:mt-0 top-32 z-10">
        <CardStack cards={cardStackList} showTrackCard={true}></CardStack>
    </div>
  </section>
  <section class="py-24 2xl:py-48 px-12 bg-theme-white dark:bg-theme-black w-full">
    <h1 class="text-4xl lg:text-6xl font-bold text-theme-green">Add to Wallet</h1>
    <h2 class="text-2xl lg:text-4xl font-semibold lg:w-1/2">Add any card that you own to your Wallet to compare features and rewards!</h2>
    <a href="/s/unique-features/" class="mt-6 bg-theme-blue hover:bg-theme-blue-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center">Discover all unique features</a>
  </section>
  * In a fictional universe simulator 
</main>

<!--Homepage-->
<svelte:head>
  <title>Credit Card Cafe</title>
  <meta name="description" content="Credit Card Cafe - the ultimate community credit card research tool">
</svelte:head>
 
<style>
  .fade {
    position:relative;
    overflow: hidden;
  }
  .cardGrid {
    margin-left: calc(-45rem + 45vw);
    @media (min-width: 1024px) {
      margin-left: calc(120vw - 90rem);
      @media (min-width: 1536px) {
      margin-left: calc(110vw - 90rem);
    }
    }
  }
  .fade::before {
    top: 0;
    left: 0;
    width: 20.25rem;
    height: 12.75rem;
    z-index: 31;
    pointer-events: none;
  }
  .creditCard {
        width: 20.25rem;
        height: 12.75rem;
        border-radius: 0.75rem;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>
