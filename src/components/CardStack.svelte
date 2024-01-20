<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let cards:Array<CreditCardType>;
    export let showTrackCard = false;
    import CreditCard from "./CreditCard.svelte";
</script>

<div class="cards">
    {#each cards as card}
      <div class="mb-[-9rem] transition-all last:mb-12 hover:mb-12">
        <CreditCard card={card} --color="{card.color}" showTrackCard={showTrackCard} inCardStack={true}></CreditCard>
      </div>
    {/each}
</div>