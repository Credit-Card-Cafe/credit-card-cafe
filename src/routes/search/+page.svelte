<script>
  import SearchTable from "./components/SearchTable.svelte";

    var queries = ["network", "annual_fee"];
    var results = 5;

</script>

<div id="search">
    <div id="queries">
        <span>Network <input type="checkbox" value="network" bind:group={queries}></span>
        <span>Annual Fee<input  type="checkbox" value="annual_fee" bind:group={queries}></span>
        <span>Foreign Transaction Fee <input type="checkbox" value="foreign_transaction_fee" bind:group={queries}></span>
        <span>Rewards Redemption <input type="checkbox" value="redemption" bind:group={queries}></span>
        <span>Brand <input type="checkbox" value="brand" bind:group={queries}></span>
        <span>Results: <select bind:value={results}>
            <option disabled selected>{results}</option>
            <option>5</option>
            <option>10</option>
            <option>25</option>
        </select></span>
    </div>
    <SearchTable queries={queries} results={results}></SearchTable>
</div>

<style>
    #search {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px;
    }
    #queries {
        display: flex;
        flex-direction: row;
    }
    input {
        margin-right: 20px;
    }
</style>
