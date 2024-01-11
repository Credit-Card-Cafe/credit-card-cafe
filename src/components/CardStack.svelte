<script>
    export let cards;
    export let showTrackCard = false;
    export let left = false;
    import CreditCard from "./CreditCard.svelte";
</script>

<div class="cards">
    {#each cards as card, i}
    {#if i == cards.length-1}
    <div class="lastcard">
        <CreditCard card={card} --color="{card.color}" showTrackCard={showTrackCard} inCardStack={true} left={left}></CreditCard>
    </div>
    {:else}
      <div class={left?"left card":"right card"}>
        <CreditCard card={card} --color="{card.color}" showTrackCard={showTrackCard} inCardStack={true} left={left}></CreditCard>
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
  @media (min-width: 768px) {
    .right:hover {
       margin-left: 2rem;
    }
    .left:hover {
       margin-right: 2rem;
    }
  }
</style>