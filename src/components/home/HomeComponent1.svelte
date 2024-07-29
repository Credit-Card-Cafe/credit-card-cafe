<script lang="ts">
    import { goto } from "$app/navigation";
    import { CardNetwork, type CreditCardType } from "$lib/types";
    import CreditCard from "components/CreditCard.svelte";

    let loadingCard:CreditCardType = {
      id: "null",
      url: "null",
      bank_id: "null",
      name: "",
      bank: "",
      network: "" as CardNetwork.None,
      physical: {
        chip: true,
      }
  }
</script>

<div class="pt-20 md:pt-0 bg-gradient-to-t from-purple-100 dark:from-purple-700 to-alt dark:to-main-gray to-80% md:min-h-[calc(100vh-4rem)] flex flex-col justify-evenly md:snap-end px-24">
    <div class="flex flex-row justify-evenly items-center">
        <div class="text-3xl md:text-6xl font-semibold text-center flex flex-col">
            Which Card Should I get?
            <button on:click={() => goto(`/cardfinder`)} class="px-4 py-2 md:px-8 text-lg md:text-2xl text-center rounded-md hover:bg-black/[0.3] transition-all flex flex-row items-center justify-center">Experience CardFinder A.I.
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>        
            </button>
        </div>
        <CreditCard card={loadingCard} --color="72,222,128">?</CreditCard>
    </div>
</div>