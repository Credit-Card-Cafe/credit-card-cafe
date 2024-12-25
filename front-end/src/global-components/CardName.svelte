<script lang="ts">
    import type { ModifiedCardObject } from "$lib/types";
    import { getOneBankByName } from "../routes/api/banks/banks";
    import { getOneBrandByURL } from "../routes/api/brands/brands";
    export let card:ModifiedCardObject;
    export let fontSize: "small" | "medium" | "large" = "large"

    const excludedWords = new Set(["from", "of", "card", "bank", "credit", "the"]);
    let cardName = card.card_name;

    if (cardName.split(' ').length > 4) {
 cardName = cardName.replace(card.card_bank, '');
}

cardName = cardName
 .split(' ')
 .filter(word => !excludedWords.has(word.toLowerCase()))
 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
 .join(' ')
 .trim();


</script>

<h1 class="{fontSize == 'large' ? 'text-4xl lg:text-6xl' : ''} {fontSize == 'medium' ? 'text-4xl' : ''} {fontSize == 'small' ? 'text-2xl' : ''} font-bold">{cardName}</h1>
{#if card.card_brand}
    {#await getOneBrandByURL(card.card_brand)}
    <h2 class="{fontSize == 'large' ? 'text-3xl' : ''} {fontSize == 'medium' ? 'text-2xl' : ''} {fontSize == 'small' ? 'text-xl' : ''} font-light">{card.card_brand}</h2>
    {:then brand} 
    <h2 class="{fontSize == 'large' ? 'text-3xl' : ''} {fontSize == 'medium' ? 'text-2xl' : ''} {fontSize == 'small' ? 'text-xl' : ''} font-light cursor-pointer"><a href='/brand/{brand?.brand_url}'>{card.card_brand}</a></h2>
    {/await}
{:else}
    {#await getOneBankByName(card.card_bank)}
    <h2 class="{fontSize == 'large' ? 'text-3xl' : ''} {fontSize == 'medium' ? 'text-2xl' : ''} {fontSize == 'small' ? 'text-xl' : ''} font-light">{card.card_bank}</h2>
    {:then bank} 
    <h2 class="{fontSize == 'large' ? 'text-3xl' : ''} {fontSize == 'medium' ? 'text-2xl' : ''} {fontSize == 'small' ? 'text-xl' : ''} font-light cursor-pointer"><a href='/bank/{bank?.bank_url}'>{card.card_bank}</a></h2>
    {/await}
{/if}

<style>
    h1::first-letter {
        text-transform: capitalize;
    }
</style>