<script>
    import { page } from '$app/stores';
</script>

<div class="flex flex-col pt-16 h-full w-full pb-20 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
    <div class="mb-10">Yikes something went wrong (Your Fault, not the devs!)</div>
    {#if $page.error}
    <h1 class="mb-10">{$page.status}: {$page.error.message}</h1>
    {/if}
    <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=-d2rXovcatCVH59S&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>