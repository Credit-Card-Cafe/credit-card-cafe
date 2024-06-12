<script lang="ts">
    export let query:string | null;
    import CreditCard from "components/CreditCard.svelte";
    import { getCards } from "$lib/database/read";
    import BankCard from "components/BankCard.svelte";
    import type { BankType, CreditCardType } from "$lib/types";

    let list:Array<CreditCardType | BankType> = [];

    getCards().then((cards) => {
        list = cards
    })

    let e = query;

</script>

<div id="cardList" class="grid grid-cols-1 gap-4 justify-center pt-8 md:grid-cols-2 md:gap-12 lg:gap-6 lg:grid-cols-3">
    {#each list as item}
        <div class="mb-8"><CreditCard card={item} showTrackCard={true}></CreditCard></div>
    {/each}
</div>

<style>
    @media (min-width: 768px) and (max-width: 1199px) {
        #cardList > div:nth-child(2n+1){
            z-index: 5;
        }
        #cardList > div:nth-child(2n){
            z-index: 3;
        }
        #cardList > div:nth-child(2n):hover{
            z-index: 8;
        }
    }
    @media (min-width: 1200px) {

        #cardList > div:nth-child(3n+1){
            z-index: 5;
        }
        #cardList > div:nth-child(3n+2){
            z-index: 3;
        }
        #cardList > div:nth-child(3n+2):hover{
            z-index: 8;
        }
        #cardList > div:nth-child(3n){
            z-index: 5;
        }
    }
</style>