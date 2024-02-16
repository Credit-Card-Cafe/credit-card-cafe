<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    import { user } from "$lib/stores";
    export let card:CreditCardType;
</script>

<div class="flex flex-col items-center">
{#if card.link}
    <div class="mb-8 flex flex-col items-center justify-center lg:col-start-1"><a class="bg-blue-500 hover:bg-blue-600 text-white text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-all cursor-pointer" href={card.link}>Apply to the card here</a></div>
{/if}
{#if $user}
      <a class="my-8 bg-gray-300 hover:bg-gray-400 text-center text-white py-1 px-4 rounded-md inline-block transition-all cursor-pointer" href="/contribute/update/{card.id}">[ Update Information ]</a>
{/if}

</div>