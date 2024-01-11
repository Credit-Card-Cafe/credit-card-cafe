<script lang="ts">
    import SearchTable from "./components/SearchTable.svelte";
    import { page } from '$app/stores';
    import SearchResults from "./components/SearchResults.svelte";

    $: hasQuery = $page.url.searchParams.has("q")
</script>

<div>
{#if hasQuery}
<SearchResults query={$page.url.searchParams.get("q")}></SearchResults>
{:else}
<SearchTable></SearchTable>
{/if}
</div>

<style>
    
</style>
