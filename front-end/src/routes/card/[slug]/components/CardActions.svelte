<script lang="ts">
    import type { ModifiedCardObject } from "$lib/types";
    export let card:ModifiedCardObject
</script>

<div class="flex flex-col items-center">
{#if card.card_link}
    <div class="mb-8 flex flex-col items-center justify-center lg:col-start-1"><a class="bg-blue-500 hover:bg-blue-600 text-white text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-all cursor-pointer" href={card.card_link}>Apply to the card here</a></div>
{/if}
{#if false}
    <a class="my-8 bg-gray-300 hover:bg-gray-400 text-center text-white py-1 px-4 rounded-md inline-block transition-all cursor-pointer" href="./">[ Update Information ]</a>
{/if}
</div>