<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
</svelte:head>

<script lang="js">
  import { cardList } from '../lib/stores';
  import "./global.css";
</script>

<div>Welcome to Credit Card DB</div>
<div>Here you can find advanced details about credit cards</div>

{#each $cardList as card}
  <a href="/card/{card.url}">
    <span>{card.bank}</span> -
    <span>{card.name}</span>
  </a><br>
{/each}

<style>
  :global(body) {
    margin: 0;
  }
</style>