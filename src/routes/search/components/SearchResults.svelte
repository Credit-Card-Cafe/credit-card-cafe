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
{#each list as card}
    <CreditCard card={card} --color="{card.color}" showTrackCard={true}></CreditCard>
{/each}
</div>

<style>
    #cardList {
        display: grid;
        grid-template-columns: auto auto auto;
        row-gap: 3rem;
    }
</style>