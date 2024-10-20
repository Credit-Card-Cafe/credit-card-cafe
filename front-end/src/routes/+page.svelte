<script lang="ts">
    import "./global.css";
    import CardStack from "global-components/CardStack.svelte";
    import ScrollBouncy from "global-components/ScrollBouncy.svelte";
    import { onMount } from "svelte";
    export let data
    

</script>

<main class="bg-gradient-to-tr from-theme-white dark:from-theme-black from-65% to-theme-green dark:to-theme-green">
  <section class="flex flex-row items-center px-8 mt-12 mb-48">
    <div class="mt-20 basis-1/3">
      <h1 class="text-4xl md:text-7xl font-semibold"><span class="text-green-500">CreditCard</span><span class="text-sm md:text-2xl">&#9632;</span><span class="text-yellow-800">Cafe</span></h1>
      <h2 class="text-2xl md:text-6xl font-semibold">the <magic>ultimate</magic> community credit card research tool</h2>
    </div>
    <CardStack cards={data.cards} allowCardFanning={false}></CardStack>
  </section>
  <section>
    <h1 class="text-2xl md:text-6xl font-semibold">What is a Card Stack?</h1>
  </section>
</main>

<!--Homepage-->
<svelte:head>
  <title>Credit Card Cafe</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>
 