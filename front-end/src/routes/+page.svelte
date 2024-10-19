<script lang="ts">
  import "./global.css";
    import ScrollBouncy from "global-components/ScrollBouncy.svelte";
    import { onMount } from "svelte";

    const cardsOnPage = ["10003", "10002", "10015"]

</script>

<div id="home" class="dark:text-white-warm pt-20 group">
    <div class="mb-[27rem] mt-10">
      <h1 class="text-4xl md:text-8xl font-semibold text-center"><span class="text-green-500">CreditCard</span><span class="text-sm md:text-2xl">&#9632;</span><span class="text-yellow-800">Cafe</span></h1>
      <h2 class="text-2xl md:text-6xl font-semibold text-center">the <magic>ultimate</magic> community credit card research tool</h2>
    </div>
</div>

<!--Homepage-->
<svelte:head>
  <title>Credit Card Cafe</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>
