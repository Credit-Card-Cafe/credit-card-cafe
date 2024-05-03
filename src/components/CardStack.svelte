<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let cards:Array<CreditCardType>;
    export let allowCardFanning = true;
    export let showTrackCard = false;
    import CreditCard from "./CreditCard.svelte";
</script>

<div class="cards">
    {#each cards as card}
    {#if allowCardFanning}
      <div class="mb-[-9rem] transition-all last:mb-12 hover:mb-12">
        <CreditCard card={card} showTrackCard={showTrackCard}></CreditCard>
      </div>
    {:else if !allowCardFanning}
      <div class="mb-12">
        <CreditCard card={card} showTrackCard={showTrackCard}></CreditCard>
      </div>
    {/if}
    {/each}
</div>