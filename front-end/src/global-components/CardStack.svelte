<script lang="ts">
    import type { CardObject } from "$lib/types";
    export let cards:Array<CardObject>;
    export let allowCardFanning = true;
    export let showTrackCard = false;
    import CreditCard from "global-components/CreditCard.svelte";
</script>

{#if allowCardFanning}
<div>
  {#each cards as card}
    <div id="{card.card_url}" class="mb-[-9rem] transition-all last:mb-12 hover:mb-12">
      <CreditCard card={card} showTrackCard={showTrackCard}></CreditCard>
    </div>
  {/each}
</div>

{:else if !allowCardFanning}
<div class="mx-auto">
  {#each cards as card, index}
    <div class={`mb-[-9rem] mb-12 translate-x-${index * 12}`}>
      <CreditCard card={card} showTrackCard={showTrackCard}></CreditCard>
    </div>
  {/each}
</div>
{/if}
