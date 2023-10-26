<script>
    import SearchTable from "./components/SearchTable.svelte";
    import { page } from '$app/stores';

</script>

{#if $page.url.searchParams.has("q")}
<div>Eventually searching for {$page.url.searchParams.get("q")}...</div>
{:else}
<SearchTable></SearchTable>
{/if}

<style>
    
</style>
