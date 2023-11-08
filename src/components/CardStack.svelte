<script>
    export let cards;
    import CreditCard from "./CreditCard.svelte";
</script>

<div class="cards">
    {#each cards as card, i}
    {#if i == cards.length-1}
    <div class="lastcard"><a href="/card/{card.url}">
        <CreditCard card={card} --color="{card.color}"></CreditCard>
      </a></div>
    {:else}
      <div class="card"><a href="/card/{card.url}">
        <CreditCard card={card} --color="{card.color}"></CreditCard>
      </a></div>
    {/if}
    {/each}
</div>

<style>
  .card {
    margin-bottom: -11rem;
    transition: 0.25s all ease;
  }
  .lastcard {
    margin-bottom: 3rem;
  }
  .card:hover {
    margin-bottom: 1rem;
  }
</style>