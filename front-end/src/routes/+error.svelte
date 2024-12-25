<script>
    import { page } from '$app/stores';
    console.log("Yes Grandma, I would like another Stawberry.")
</script>

<main class="flex flex-col h-full w-full pb-20 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
    <p class="text-4xl md:text-6xl pt-16 pb-4 font-semibold">Yikes, something went wrong!</p>
    {#if $page.error}
    <p class="text-3xl font-light pb-16">{$page.status}: {$page.error.message}</p>
    {/if}
    <a href="/" class="text-3xl font-light hover:underline">Lets bring you back to the fun -></a>
</main>