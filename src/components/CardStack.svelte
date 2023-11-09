<script>
    export let cards;
    export let showTrackCard = false;
    import CreditCard from "./CreditCard.svelte";
</script>

<div class="cards">
    {#each cards as card, i}
    {#if i == cards.length-1}
    <div class="lastcard">
        <CreditCard card={card} --color="{card.color}" showTrackCard={showTrackCard}></CreditCard>
    </div>
    {:else}
      <div class="card">
        <CreditCard card={card} --color="{card.color}" showTrackCard={showTrackCard}></CreditCard>
      </div>
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