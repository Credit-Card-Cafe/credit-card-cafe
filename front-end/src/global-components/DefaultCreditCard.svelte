<script lang="ts">
    import { type ModifiedCardObject } from "$lib/types";
    import CreditCard from "./CreditCard.svelte";

    const displayCard = {
        card_name: "Credit Card Cafe",
        card_url: "null",
        card_bank: "Credit Card Cafe",
        card_color: "#373737"
    } as unknown as ModifiedCardObject


</script>

<div class="flex flex-col items-center">
<CreditCard card={displayCard} altLink="/">
    <div class="h-8 mt-2 w-full stretch bg-theme-black"></div>
    <div class="text-4xl font-bold text-center flex flex-row items-baseline"><span class="text-theme-green">creditcard</span><span class="text-[7px] leading-4">&#9632;</span><span class="text-theme-brown">cafe</span></div>
    <h2 class="text-lg mb-1 px-6 font-semibold text-left text-theme-text-white">the ultimate community credit card research tool</h2>
</CreditCard>
</div>

