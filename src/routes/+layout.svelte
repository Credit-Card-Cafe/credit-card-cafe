<script lang="ts">
    import "../app.css";
    import { user, admin, cardList } from "$lib/stores";
    import LogInButton from "components/layout/LogInButton.svelte";
    import SearchBar from "components/layout/SearchBar.svelte";
    import AccountActions from "components/layout/AccountActions.svelte";
    import MobileActions from "components/layout/MobileActions.svelte";
    import Nav from "components/layout/Nav.svelte";

    $: showMobileMenu = false;
</script>


{#if $cardList.length == 0}
    <div class="p-2 bg-red-300 text-center font-semibold hidden lg:block">Trying to connect to the database, give us a sec! (Or refresh, that sometimes helps.)</div>
{/if}
{#if showMobileMenu}
    <MobileActions bind:showMobileMenu></MobileActions>
{/if}
<div class={`flex flex-row lg:items-center justify-between lg:justify-items-center lg:py-4 lg:px-8 py-2 bg-alt dark:bg-main-gray shadow-md shadow-main-dark-green`}>
    <div class="flex items-center justify-center lg:hidden ml-8 lg:ml-0 lg:mr-8 text-green-500 font-semibold">CreditCardDB</div>
    <div id="start" class="hidden lg:flex flex-row justify-between items-center">
        <div class="ml-8 lg:ml-0 lg:mr-8 text-green-500 font-semibold">CreditCardDB</div>
        <Nav></Nav>
        <SearchBar></SearchBar>
    </div>
    <div id="end" class="hidden lg:flex">
        {#if $user}
            <AccountActions></AccountActions>
        {:else}
            <LogInButton></LogInButton>
        {/if}
    </div>
    <div class="block lg:hidden p-6">
        <button on:click={() => showMobileMenu = !showMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-green-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    </div>
</div>
{#if $user && $admin}
    <div class="hidden lg:block fixed top-16 right-8 bg-white p-2 border">
        <pre>uid: {$user.uid}<br>displayName: {$user.displayName}<br>email: {$user.email}</pre>
    </div>
{/if}

<div class="w-full min-h-[-webkit-fill-available] bg-alt dark:bg-main-gray pb-16"><slot /></div>


<!-- Footer -->
<div class="w-full p-10 bg-alt/90 dark:bg-main-gray flex flex-col items-center">
    <div class="hidden md:block lg:mr-8 text-green-500 font-semibold">CreditCardDB</div>
    <div class="dark:text-white-warm md:pt-16 md:ml-12 px-8">
        <div>Here you can find advanced details about credit cards</div>
        <div>Disclosure:</div>
        <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div>
        <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div>
    </div>
    <div class="p-8">Developed by Ben Keil 2024 please visit <a href="benkeil.com">benkeil.com</a></div>  
      
</div>