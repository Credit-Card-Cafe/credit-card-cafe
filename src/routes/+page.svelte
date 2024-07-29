<script lang="ts">
  import Categories from "components/home/Categories.svelte";
  import "./global.css";
    import ScrollBouncy from "components/home/ScrollBouncy.svelte";
    import HomeComponent1 from "components/home/HomeComponent1.svelte";

</script>

<div id="home" class="dark:text-white-warm pt-20 group">
  <ScrollBouncy>
    <div class="mb-[27rem] md:mb-96 mt-10 md:snap-end">
      <div class="text-5xl md:text-8xl text-green-500 font-semibold text-center">CreditCardDB</div>
      <div class="text-3xl md:text-6xl font-semibold text-center">the <magic>ultimate</magic> credit card research tool</div>
    </div>
  </ScrollBouncy>
  <HomeComponent1></HomeComponent1>
  <Categories></Categories>
</div>

<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
  <meta name="description" content="Credit Card Database - Discover and view advanced details about Credit Cards">
</svelte:head>
