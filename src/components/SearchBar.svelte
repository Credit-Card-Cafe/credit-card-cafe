<script>
    import { cardList } from "../lib/stores";

    function search() {
        if (value != "") {
            window.alert(`Searching: ${value}`);
        }
    }

    let value = ""


</script>

<div id="searchBar">
    <input type="text" bind:value placeholder="Search cards...">
    <input type="submit" on:click={() => search()}>
</div>

<style>

</style>