<script>
  import SearchTable from "./components/SearchTable.svelte";

var queries = ["network", "color"];

</script>

<div>
    <SearchTable queries={queries}></SearchTable>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px;
    }
</style>
