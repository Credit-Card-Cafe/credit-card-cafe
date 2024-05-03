<script lang="ts">
    import AccountActions from "./AccountActions.svelte";
    import SearchBar from "./SearchBar.svelte";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let showMobileMenu: boolean;

    function mobileMenu() {
        showMobileMenu = !showMobileMenu;
		dispatch('menuState', {
			state: showMobileMenu
		});
	}
</script>


<div class={`fixed z-40 w-full flex flex-row lg:items-center justify-between lg:justify-items-center lg:py-4 lg:px-8 backdrop-blur-md py-2 bg-alt/[0.8] dark:bg-main-gray`}>
    <div class="flex items-center justify-center lg:hidden ml-8 lg:ml-0 lg:mr-8 text-green-500 font-semibold">CreditCardDB</div>
    <div id="start" class="hidden lg:flex flex-row justify-between items-center">
        <div class="ml-8 lg:ml-0 lg:mr-8 text-green-500 font-semibold">CreditCardDB</div>
        <nav class="inline">
            <a class="text-black dark:text-white-warm p-3 m-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/">Featured</a>
            <a class="text-black dark:text-white-warm p-3 m-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/table">Table</a>
        </nav>
        <SearchBar></SearchBar>
    </div>
    <div id="end" class="hidden lg:flex">    
        <AccountActions></AccountActions>
    </div>
    <div class="block lg:hidden p-6">
        <button on:click={() => mobileMenu()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-green-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    </div>
</div>