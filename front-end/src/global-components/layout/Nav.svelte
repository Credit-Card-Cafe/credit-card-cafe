<script lang="ts">
    import { onMount } from "svelte";
    import SearchBar from "./SearchBar.svelte";

    let showMobileMenu = false
    function mobileMenu() {
        showMobileMenu = !showMobileMenu
	}

    let windowWidth = 0
    let y_pos = 0;
    let scrolled = false;


    function closeMenu() {
        showMobileMenu = false
        windowWidth = window.outerWidth
    }

    onMount(() => {
        if (window.outerWidth >= 768) {
            showMobileMenu = true
        }
        addEventListener("resize", (event) => {
            windowWidth = window.outerWidth
        });
        document.addEventListener("scroll", (e) => {
            y_pos = window.scrollY;
            let header = document.getElementById("header") 
            if (y_pos <= 0) {
                y_pos = 0
            }
            if (header) {
                if (y_pos <= 80) {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) header.style.backgroundColor = `rgba(38, 38, 38, ${y_pos/100})`;
                    else header.style.backgroundColor = `rgba(240, 253, 250, ${y_pos/100})`;
                }
            }
        })
    })
</script>


<header id="header" class="fixed z-40 w-full flex flex-col justify-between md:flex-row md:items-center md:justify-items-center md:py-4 md:px-2 lg:px-8 py-2 backdrop-blur-md">
    <div class="inline md:hidden p-6">
        <button on:click={() => mobileMenu()}>
            {#if showMobileMenu}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            {:else}              
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-green-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/if}
        </button>
    </div>
    {#if showMobileMenu || windowWidth >= 768}
    <a on:click={() => closeMenu()} href="/" class="hidden md:inline float-right"><img class="h-4" src="https://firebasestorage.googleapis.com/v0/b/creditcarddb-3fafd.appspot.com/o/creditcardcafelogo.png?alt=media&token=847bdd20-d667-481e-8448-5bc5b1efcc14" alt="creditcard.cafe"></a>
    <SearchBar></SearchBar>
    <hr class="md:hidden w-11/12 mx-auto my-2 justify-end">
    <nav class="inline-flex flex-col md:flex-row">
        <a on:click={() => closeMenu()} class="text-black dark:theme-text-white p-3 md:mx-1 lg:mx-2 my-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/">Featured</a>
        <a on:click={() => closeMenu()} class="text-black dark:theme-text-white p-3 md:mx-1 lg:mx-2 my-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/table">Table</a>
        <a on:click={() => closeMenu()} class="text-black dark:theme-text-white p-3 md:mx-1 lg:mx-2 my-2 hover:bg-black/[0.1] hover:rounded transition-all" href="/account" >My Cards</a>
    </nav>
    {/if}
</header>

<style>
    hr {
        border: 2px solid #d6c0a5;
    }
</style>