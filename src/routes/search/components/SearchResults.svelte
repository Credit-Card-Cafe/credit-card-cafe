<script lang="ts">
    export let query:string | null;
    import CreditCard from "components/CreditCard.svelte";
    import { getBankList } from "$lib/firebase";
    import { cardList, admin } from "$lib/stores";
    import BankCard from "components/BankCard.svelte";
    import type { BankType, CreditCardType } from "$lib/types";

    let list:Array<CreditCardType | BankType> = [];

    getBankList.then((banks) => {
        list = [...banks, ...$cardList].filter((item) => (
            "bank" in item && //cards HAVE banks. 
            item.search_terms &&
            query &&
            item.search_terms.join(" ").toLowerCase().includes(query.toLowerCase())
            ) || (
            item.nicknames &&
            query &&
            item.nicknames.concat([item.name]).join(" ").toLowerCase().includes(query.toLowerCase())
            ) && (
            item.id &&
            item.name
            )
        ).sort((a, b) => { //generic sorting algorithm
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    });

</script>

<div id="cardList" class="grid grid-cols-1 gap-4 justify-center pt-8 md:grid-cols-2 md:gap-12 lg:gap-6 lg:grid-cols-3">
    {#each list as item}
        {#key query}
            {#if "bank" in item} 
            <div class=""><CreditCard card={item} --color="{item.color}" showTrackCard={true}></CreditCard></div>
            {:else if Object.hasOwn(item, "id")}
            <div><BankCard bank={item}></BankCard></div>
            {/if}
        {/key}
    {/each}
{#if $admin}
    <div class="a">
        <pre>list: {JSON.stringify(list.map((i) => (Object.hasOwn(i,"bank")?"card - ":"bank - ") + i.name),null,1)}</pre>
    </div>
{/if}
</div>

<style>
    .a {
        position: fixed;
        top: 2.5rem;
        left:2rem;
        background: white;
        padding: 0.5rem;
        border: 1px solid black;
        width: 20rem;
        margin-left:auto;
        margin-right:auto;
        text-align:left;
        overflow:scroll;
        white-space: nowrap;
    }
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