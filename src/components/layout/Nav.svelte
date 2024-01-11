<script lang="ts">
    import { user } from "$lib/stores";
</script>

<nav class="inline">
    <a class="text-black dark:text-white-warm p-3 m-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/">Home</a>
    <a class="text-black dark:text-white-warm p-3 m-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/search">Cards</a>
    {#if $user}
        <a class="hidden md:inline text-black dark:text-white-warm p-3 m-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/contribute">Contribute</a>
        {#if $user.admin}
            <a class="hidden md:inline text-black dark:text-white-warm p-3 m-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/submissions">Submissions</a>
        {/if}
    {/if}
</nav>