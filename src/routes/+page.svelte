<script lang="ts">
  import Categories from "components/home/Categories.svelte";
  import "./global.css";
    import ScrollBouncy from "components/home/ScrollBouncy.svelte";
    import HomeComponent1 from "components/home/HomeComponent1.svelte";
    import { onMount } from "svelte";

    onMount(() => {
      let footer = document.getElementById("footer")
      if (footer) {
        footer.classList.add("md:snap-end")
      }
      return () => {
        if (footer) {
          footer.classList.remove("md:snap-end")
        }
      }
    })

</script>

<div id="home" class="dark:text-white-warm pt-20 group">
  <ScrollBouncy>
    <div class="mb-[27rem] mt-10 md:snap-end">
      <div class="text-5xl md:text-8xl font-semibold text-center"><span class="text-green-500">CreditCard</span><span class="text-sm md:text-2xl">&#9632;</span><span class="text-yellow-800">Cafe</span></div>
      <div class="text-3xl md:text-6xl font-semibold text-center">the <magic>ultimate</magic> community credit card research hub</div>
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
