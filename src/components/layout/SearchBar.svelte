<script lang="ts">
    import { goto } from '$app/navigation';

    function search() {
        if (value.replace(/ /g, '') != "") {
            goto(`/search?q=${value}`);
            value = "";
        }
    }

    let value = "";


</script>

<form on:submit|preventDefault={() => search()} class="flex">
    <input class="bg-slate-100 border rounded mx-4 pl-2" type="text" bind:value placeholder="Search cards...">
    {#if value.length > 0}
        <input class="hidden md:inline dark:text-main-gray cursor-pointer bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-all hover:bg-green-700" type="submit" on:click={() => search()}>
    {/if}
</form>
