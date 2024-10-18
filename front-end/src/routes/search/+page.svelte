<script lang="ts">
    import { page } from '$app/stores';
    import SearchResults from "./components/SearchResults.svelte";

    let hasQuery = $page.url.searchParams.has("q")
    const q = $page.url.searchParams.get("q")

</script>

<div>
{#if hasQuery}
<SearchResults query={q}></SearchResults>
{/if}
</div>

<style>
    
</style>
