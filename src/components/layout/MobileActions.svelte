<script lang="ts">
    import { user } from "$lib/stores";
    import { logout } from '$lib/firebase';
    import LogInButton from "./LogInButton.svelte";
    import SearchBar from "./SearchBar.svelte";
    export let showMobileMenu:boolean;
</script>

<div class="z-50 fixed w-full top-0 flex flex-col items-center justify-evenly p-8 bg-white/50 dark:bg-main-gray/80 backdrop-blur-md border-b-2 border-green-500 dark:border-alt lg:hidden">
    <div class="flex flex-row justify-between w-full mx-2 my-4">
        <SearchBar></SearchBar>
        <button on:click={() => showMobileMenu = !showMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-400 hover:text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>          
        </button>
    </div>
    <a class="text-black dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" href="/" on:click={() => showMobileMenu = !showMobileMenu}>Home</a>
    <a class="text-black dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" href="/search" on:click={() => showMobileMenu = !showMobileMenu}>Cards</a>
    {#if $user}
        <a href="/account" class="dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" on:click={() => showMobileMenu = !showMobileMenu}>{$user.displayName}</a>
        <button class="text-black dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" on:click={logout}>Log out</button>
    {:else}
    <LogInButton></LogInButton>
    {/if}
    
</div>

<style>
.navbtn {
    @apply p-3 m-2 transition-all rounded-lg w-full text-center;
}
</style>