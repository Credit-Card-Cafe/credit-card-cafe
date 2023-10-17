<script>
    import { dataField } from "../../../lib/fields";
    import { cardList } from "../../../lib/stores";
    export let queries;

    var searchResults = $cardList;

    function sortCards() {
        searchResults.sort();
    }
</script>

<table>
    <tr>
        <th on:click={sortCards()}>Card &darr;</th>
        <th>Bank</th>
        {#each queries as query}
            <th>{dataField[query].name}</th>
        {/each}
    </tr>
    {#each searchResults as card}
    
    <tr>
        <td><a href="/card/{card.url}">{card.name} </a></td>
        <td>{card.bank}</td>
        {#each queries as query}
        <td>{card[query]}</td>
        {/each}
    </tr>
       
    
    {/each}
</table>

<style>
    table > tr:nth-child(even) {
  background-color: rgb(240, 251, 255);
}
th,td {
    padding: 5px;
    cursor: pointer;
}
</style>