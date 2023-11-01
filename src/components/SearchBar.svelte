<script>
    import { goto } from '$app/navigation';

    function search() {
        if (value.replace(/ /g, '') != "") {
            goto(`/search?q=${value}`);
            value = "";
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