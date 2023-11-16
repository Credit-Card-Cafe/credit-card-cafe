<script>
    export let query;
    import CreditCard from "../../../components/CreditCard.svelte";
    import { cardList } from "../../../lib/stores";

    const list = $cardList.filter((card) => (
            Object.hasOwn(card, "search_terms") 
            &&
            card.search_terms.join(" ").toLowerCase().includes(query.toLowerCase()) 
            ||
            query == "*"
        ) && (
            Object.hasOwn(card, "id")
            &&
            Object.hasOwn(card, "name")
        )
    );

</script>

<div id="cardList">
{#each list as card, i}
    <div>
        {#if (i+1)%3==0}
        <CreditCard card={card} --color="{card.color}" showTrackCard={true} left={true}></CreditCard>
        {:else}
        <CreditCard card={card} --color="{card.color}" showTrackCard={true}></CreditCard>
        {/if}
    </div>
{/each}
</div>

<style>
    #cardList {
        display: grid;
        grid-template-columns: auto;
        row-gap: 1rem;
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