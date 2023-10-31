<script>
    export let query;
    import CreditCard from "../../../components/CreditCard.svelte";
    import { cardList } from "../../../lib/stores";

    const list = $cardList.filter((card) => (
            Object.hasOwn(card, "search_terms") 
            && 
            card.search_terms.toString().toLowerCase().includes(query.toLowerCase()) 
        )
    );

</script>

<div id="cardList">
{#each list as card}
    <a href="/card/{card.url}">
        <CreditCard card={card} --color="{card.color}"></CreditCard>
    </a>
{/each}
</div>

<style>
    #cardList {
        display: flex;
        flex-direction: column;
    }
    a {
        margin-bottom: 3rem;
    }
</style>