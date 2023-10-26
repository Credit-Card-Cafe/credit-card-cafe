<script>
    import { dataField } from "../../../lib/fields";
    import {orderCards} from "../../../lib/firebase";
    import { cardList, user } from "../../../lib/stores";
    
    var queries = ["network", "annual_fee"];
    var results = 5;

    let searchResults = $cardList

    function order(param) {
        orderCards(param, results).then((list) => {
            searchResults = list;
        });
    }

</script>

<div id="search">
    <div id="queries">
        <span>Network <input type="checkbox" value="network" bind:group={queries}></span>
        <span>Brand <input type="checkbox" value="brand" bind:group={queries}></span>
        <span>Consumer <input type="checkbox" value="consumer" bind:group={queries}></span>
        <span>Annual Fee<input  type="checkbox" value="annual_fee" bind:group={queries}></span>
        <span>Foreign Transaction Fee <input type="checkbox" value="foreign_transaction_fee" bind:group={queries}></span>
        <span>Rewards Redemption <input type="checkbox" value="redemption" bind:group={queries}></span>
        <span>Results: <select bind:value={results}>
            <option disabled selected>{results}</option>
            <option>5</option>
            <option>10</option>
            <option>25</option>
        </select></span>
    </div>

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
</div>

<style>
    table > tr:nth-child(even) {
  background-color: rgb(240, 251, 255);
}
th,td {
    padding: 5px;
    cursor: pointer;
}
#search {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px;
    }
    #queries {
        width: 50%;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    input {
        margin-right: 20px;
    }
</style>