<script>
    import { dataField } from "../../../lib/fields";
    import {orderCards} from "../../../lib/firebase";
    import { cardList, user, admin } from "../../../lib/stores";
    
    var queries = ["network", "fees"];
    var objects =["annual_fee","foreign_transaction_fee"];
    var results = 5;

    let searchResults = $cardList

    function order(param, objectField) {
        if (!objectField) {
            orderCards(param, results).then((list) => {
                searchResults = list;
            });
        }
    }

    $: searchResults = searchResults.filter((card) => (
        (Object.hasOwn(card, "id")
        &&
        Object.hasOwn(card, "name"))
        ||
        $admin
    ));
</script>

<div id="search">
    <div id="queries">
        <span>Network <input type="checkbox" value="network" bind:group={queries}></span>
        <span>Brand <input type="checkbox" value="brand" bind:group={queries}></span>
        <span>Consumer <input type="checkbox" value="consumer" bind:group={queries}></span>
        <span>Fees<input type="checkbox" value="fees" bind:group={queries}></span>
        {#if queries.includes("fees")}
            {#each Object.keys(dataField["fees"]["data"]) as field}
                <span>{dataField["fees"]["data"][field].name}<input type="checkbox" value={field} bind:group={objects}></span>
            {/each}
        {/if}
        <span>Rewards Redemption <input type="checkbox" value="redemption" bind:group={queries}></span>
        <span>Results: <select bind:value={results}>
            <option disabled selected>{results}</option>
            <option>5</option>
            <option>10</option>
            <option>25</option>
        </select></span>
    </div>

    <table>
        <!--Table Header-->
        <tr>
            <th>Card</th>
            <th><button on:click={() => order("bank")}>Bank</button></th>
            {#each queries as query}
                {#if dataField[query].type == "object"}
                    {#each Object.keys(dataField[query]["data"]) as field}
                        {#if objects.includes(field)}
                            <th><button on:click={() => order(query, field)}>{dataField[query]["data"][field].name}</button></th>
                        {/if}
                    {/each}
                {:else}
                    <th><button on:click={() => order(query, null)}>{dataField[query].name}</button></th>
                {/if}
            {/each}
        </tr>
        <!-- Table Data -->
        {#each searchResults as card}
        <tr>
            <td><a href="/card/{card.id}">{card.name} </a></td>
            <td>
                {#if Object.hasOwn(card, "bank_id")}
                    <a href="/bank/{card.bank_id}">{card.bank}</a>
                {:else}
                    {card.bank}
                {/if}
            </td>
            {#each queries as query}
                {#if dataField[query].type == "object"}
                    {#each Object.keys(dataField[query]["data"]) as field}
                        {#if objects.includes(field) }
                            {#if card[query] && Object.hasOwn(card[query],field)} 
                                <td>{#if dataField[query]["data"][field].unit == "$"}
                                    ${card[query][field]}
                                    {:else}
                                    {card[query][field]}{dataField[query]["data"][field].unit}
                                    {/if}
                                </td>  
                            {:else}
                                <td>[Data doesn't exist.] 
                                {#if $admin}
                                    <a href="/contribute/update/{card.id}">Add it?</a>
                                {/if}
                            </td>
                            {/if}
                        {/if}
                    {/each}
                {:else if card[query] == undefined} 
                    <td>
                    [Data doesn't exist.] 
                    {#if $admin}
                        <a href="/contribute/update/{card.id}">Add it?</a>
                    {/if}
                    </td>
                {:else} 
                    <td>{card[query]}</td>
                {/if}
            {/each}
        </tr>
        {/each}
    </table>
</div>

<style>
    #search {
        flex-direction: column-reverse;
        justify-content: center;
        display: flex;
        padding: 1rem;
        overflow-x: scroll;
    }
    table > tr:nth-child(even) {
        background-color: rgb(240, 251, 255);
    }
    th, td {
        padding: 0.5rem
    }
    #queries {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
    }
    @media (min-width: 768px) {
        
        th,td {
            cursor: pointer;
        }
        #search {
            flex-direction: column;
            padding: 30px;
        }
        #queries {
            margin-top: 0;
            grid-template-columns: auto auto auto auto auto;
            margin-bottom: 2rem;
        }
        input {
            margin-right: 20px;
        }
}
</style>