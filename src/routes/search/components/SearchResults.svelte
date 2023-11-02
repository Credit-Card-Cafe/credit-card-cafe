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
            Object.hasOwn(card, "url")
            &&
            Object.hasOwn(card, "name")
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
        display: grid;
        grid-template-columns: auto auto auto;
    }
    a {
        margin-bottom: 3rem;
    }
</style>