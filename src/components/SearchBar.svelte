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

<form id="searchBar" on:submit|preventDefault={() => search()}>
    <input type="text" bind:value placeholder="Search cards...">
    <input class="searchSubmit" type="submit" on:click={() => search()}>
</form>

<style>
    form {
        display: flex;

    }
    .searchSubmit {
        display: none;
    }
    @media (min-width: 768px) {
        .searchSubmit {
            display: initial;
        }
    }
</style>