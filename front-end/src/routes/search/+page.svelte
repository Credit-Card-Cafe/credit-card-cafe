<script lang="ts">
    import { page } from '$app/stores';
    import SearchResults from "./components/SearchResults.svelte";

    let hasQuery = $page.url.searchParams.has("q")
    const q = $page.url.searchParams.get("q")

</script>

<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black pt-16 lg:pt-24">
{#if hasQuery}
<SearchResults query={q}></SearchResults>
{/if}
</main>

<style>
    
</style>
