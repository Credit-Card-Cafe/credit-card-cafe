<script>
    export let query;
    import CreditCard from "../../../components/CreditCard.svelte";
    import { getBankList } from "$lib/firebase";
    import { cardList, admin } from "$lib/stores";
    import BankCard from "../../../components/BankCard.svelte";

    $: list = [];

    getBankList.then((banks) => {
        //cards have banks, banks dont
        list = banks.concat($cardList).filter((item) => ((
                Object.hasOwn(item, "bank") 
                &&
                Object.hasOwn(item, "search_terms") 
                &&
                item.search_terms.join(" ").toLowerCase().includes(query.toLowerCase()) 
                ||
                query == "*"
            ) || (
                Object.hasOwn(item, "nicknames") 
                &&
                item.nicknames.concat([item.name]).join(" ").toLowerCase().includes(query.toLowerCase()) 
                ||
                query == "*"
            ) && (
                Object.hasOwn(item, "id")
                &&
                Object.hasOwn(item, "name")
            ))
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

<div id="cardList">
{#each list as item}
        {#if Object.hasOwn(item, "bank")}
        <div><CreditCard card={item} --color="{item.color}" showTrackCard={true}></CreditCard></div>
        {:else if Object.hasOwn(item, "id")}
        <div><BankCard bank={item}></BankCard></div>
        {/if}
   
{/each}
{#if $admin}
    <div class="a">
        <pre>list: {JSON.stringify(list.map((i) => (Object.hasOwn(i,"bank")?"card - ":"bank - ") + i.name),null,1)}</pre>
    </div>
{/if}
</div>

<style>
    #cardList {
        display: grid;
        grid-template-columns: auto;
        row-gap: 1rem;
    }
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
        #cardList {
            display: grid;
            grid-template-columns: auto auto;
            row-gap: 3rem;
        }
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
        #cardList {
            display: grid;
            grid-template-columns: auto auto auto;
            row-gap: 3rem;
        }
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