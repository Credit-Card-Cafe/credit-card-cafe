<script lang="ts">
  import "./global.css";
  export let data;
  import CreditCard from "components/CreditCard.svelte";

</script>

<div id="home" class="dark:text-white-warm pt-16 px-8">
  <div class="pb-12 text-4xl text-center">Welcome to Credit Card DB</div>
  <div class="pb-8 text-2xl text-center">Featured Cards:</div>
  {#each data.featured as feature}
      <div class="flex lg:odd:flex-row lg:even:flex-row-reverse flex-col lg:justify-between items-center lg:items-start border-2 border-green-500 lg:px-12 mb-12 last:mb-0 rounded-2xl py-12">
        <CreditCard card={feature.card}></CreditCard>
        <div class="mx-8 md:mt-0 mt-4 z-10">{@html feature.desc}</div>
      </div>
  {/each}
</div>

<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>
