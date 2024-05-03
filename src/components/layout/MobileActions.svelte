<script lang="ts">
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
    <a class="text-black dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" href="/" on:click={() => showMobileMenu = !showMobileMenu}>Featured</a>
    <a class="text-black dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" href="/table" on:click={() => showMobileMenu = !showMobileMenu}>Table</a>
    <a class="text-black dark:text-white-warm bg-white/30 dark:bg-black/30 navbtn" href="/account" on:click={() => showMobileMenu = !showMobileMenu}>My Cards</a>

    
</div>

<style>
.navbtn {
    @apply p-3 m-2 transition-all rounded-lg w-full text-center;
}
</style>