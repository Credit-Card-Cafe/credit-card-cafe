<script lang="ts">
    import type { ModifiedCardObject } from "$lib/types";
    export let card:ModifiedCardObject;

    let cardName = card.card_name
    if (cardName.split(' ').length > 4 && cardName.includes(card.card_bank)) {
        cardName = cardName.replace(card.card_bank, '').trim();
    }
</script>

<h1 class="text-4xl lg:text-6xl font-bold">{cardName}</h1>
<h2 class="text-3xl font-light">{card.card_bank}</h2>
