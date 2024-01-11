<script lang="ts">
    import { admin, user, headerColor } from "$lib/stores";
    import { logout } from '$lib/firebase';
</script>


<div id="dropdown" class="flex flex-col md:flex-row-reverse group transition-all">
    {#if $user}
        <a href="/account" class="dark:text-white-warm inline-flex items-center p-3 hover:bg-black/[0.1] hover:rounded transition-all">{$user.displayName}</a>
        <div id="menu" class="z-20 md:group-hover:flex hidden flex-col md:flex-row transition-all">
            {#if $user.admin}
            <button class="text-black dark:text-white-warm p-3 hover:bg-black/[0.1] hover:rounded transition-all" on:click={() => $admin = !$admin}>Admin Toggle ({$admin ? "On" : "Off"})</button>
            {/if}
            <button class="text-black dark:text-white-warm p-3 hover:bg-black/[0.1] hover:rounded transition-all" on:click={logout}>Log out</button>
        </div> 
    {/if}
</div>