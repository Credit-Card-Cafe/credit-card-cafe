<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let cards:Array<CreditCardType>;
    export let showTrackCard = false;
    import CreditCard from "./CreditCard.svelte";
</script>

<div class="cards">
    {#each cards as card, i}
      <div class="mb-[-9rem] hover:mb-12 last:mb-12 transition-all md:hover:ml-8">
        <CreditCard card={card} --color="{card.color}" showTrackCard={showTrackCard} inCardStack={true}></CreditCard>
      </div>
    {/each}
</div>