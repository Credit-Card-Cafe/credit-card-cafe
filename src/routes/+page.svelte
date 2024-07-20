<script lang="ts">
  import Categories from "components/home/Categories.svelte";
  import "./global.css";
  import { onMount } from "svelte";

  
  onMount(() => {
    document.addEventListener("scroll", (e) => {
      document.getElementById("scrollBouncy")!.style.opacity = `${(100-window.scrollY)/100}`
    });
  });

</script>

<div id="home" class="dark:text-white-warm pt-20 group">
  <div class="mb-[27rem] md:mb-96 mt-10 md:snap-end">
    <div class="text-5xl md:text-8xl text-green-500 font-semibold text-center">CreditCardDB</div>
    <div class="text-3xl md:text-6xl font-semibold text-center">the <magic>ultimate</magic> credit card research tool</div>
  </div>
  <div id="scrollBouncy" class="text-xl font-semibold text-center absolute bottom-4 left-0 right-0 mx-auto group-hover:animate-bounce">Scroll to explore cards!</div>
  <Categories></Categories>
</div>

<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>
