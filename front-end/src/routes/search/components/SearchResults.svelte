<script lang="ts">
    export let query:string | null;
    // import { searchCreditCards } from "../../../database/read_cards";
    import type { CardObject } from "$lib/types";
    import { goto } from "$app/navigation";
    import SearchCard from "./SearchCard.svelte";

    let list:Array<CardObject> = [];

    if (query) {
        getCards().then((cards) => {
            if (cards.length == 1) {
                //goto(`../card/${cards[0].card_url}`)
            } else {
                list = cards
            }
        })
    }



    async function getCards() {
        return []
    }
</script>

<div id="cardList" class="grid grid-cols-1 gap-4 justify-center lg:pt-8 lg:grid-cols-3">
    {#each list as item}
        <SearchCard card={item}></SearchCard>
    {/each}
</div>