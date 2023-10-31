<script>
    import SearchTable from "./components/SearchTable.svelte";
    import { page } from '$app/stores';
  import SearchResults from "./components/SearchResults.svelte";

</script>

{#if $page.url.searchParams.has("q")}
<SearchResults query={$page.url.searchParams.get("q")}></SearchResults>
{:else}
<SearchTable></SearchTable>
{/if}

<style>
    
</style>
