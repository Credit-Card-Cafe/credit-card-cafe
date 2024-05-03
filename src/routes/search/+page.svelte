<script lang="ts">
    import { page } from '$app/stores';
    import SearchResults from "./components/SearchResults.svelte";

    $: hasQuery = $page.url.searchParams.has("q")
</script>

<div>
{#if hasQuery}
<SearchResults query={$page.url.searchParams.get("q")}></SearchResults>
{/if}
</div>

<style>
    
</style>
