<script>
    import { dataField } from "../../../lib/fields";
    import {orderCards} from "../../../lib/firebase";
  import { cardList } from "../../../lib/stores";
    export let queries;
    export let results = 5;
    import { user } from "../../../lib/stores";

    let searchResults = $cardList

    function order(param) {
        orderCards(param, results).then((list) => {
            searchResults = list;
        });
    }

</script>

<table>
    <tr>
        <th>Card</th>
        <th><button on:click={() => order("bank")}>Bank</button></th>
        {#each queries as query}
            <th><button on:click={() => order(query)}>{dataField[query].name}</button></th>
        {/each}
    </tr>
    {#each searchResults as card}
    
    <tr>
        <td><a href="/card/{card.url}">{card.name} </a></td>
        <td>{card.bank}</td>
            {#each queries as query}
            <td>
                {#if card[query] == undefined} 
                    [Data doesn't exist.] 
                    {#if $user}
                        <a href="/contribute/update/{card.url}">Add it?</a>
                    {/if}
                {:else if query == "annual_fee"} 
                    ${card[query]}
                {:else if query == "foreign_transaction_fee"}
                    {card[query]}%
                {:else} 
                    {card[query]}
                {/if}
            </td>
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