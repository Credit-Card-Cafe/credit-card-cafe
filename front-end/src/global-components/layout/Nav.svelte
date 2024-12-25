<script lang="ts">
    import { onMount } from "svelte";
    import SearchBar from "./SearchBar.svelte";
    import DarkToggle from "./DarkToggle.svelte";

    let showMobileMenu = false
    let showExpandedMenu = false 
    let theme: 'dark' | 'light' | 'null';


    function toggleMobileMenu() {
        showMobileMenu = !showMobileMenu
	}

    let windowWidth = 0;
    let y_pos = 0;

    function closeMenu() {
        showMobileMenu = false
    }

    function expandMenu() {
        showExpandedMenu = !showExpandedMenu;
    }

    let header: HTMLElement; 
    $: if (header && windowWidth >= 1024) {
        const opacity = Math.min(y_pos / 100, 0.8); // Cap opacity at 1
        if (y_pos <= 80) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && theme != 'light' || theme === 'dark') {
                header.style.backgroundColor = `rgba(38, 38, 38, ${opacity})`;
            } else {
                header.style.backgroundColor = `rgba(247, 252, 249, ${opacity})`;
            }
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && theme != 'light' || theme === 'dark') {
                header.style.backgroundColor = `rgba(38, 38, 38, 0.8)`;
            } else {
                header.style.backgroundColor = `rgba(247, 252, 249, 0.8)`;
            }
        }
    }
      
    const applyTheme = () => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        // Respect system preference if theme is null
        document.documentElement.classList.toggle(
          'dark',
          window.matchMedia('(prefers-color-scheme: dark)').matches
        );
        localStorage.removeItem('theme');
      }
    };
  
    const toggleTheme = () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
    };
  
    const respectSystemPreference = () => {
      theme = 'null';
      localStorage.removeItem('theme');
      applyTheme();
    };
  
    onMount(() => {    
        y_pos = window.scrollY;
        localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        // Check if theme preference exists in localStorage; if not, initialize it
        if (!localStorage.theme) {
            localStorage.theme = theme;
        }
        applyTheme();
    
        // Dynamically update on system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (!localStorage.theme) {
            applyTheme();
            }
        });
    });
</script>

<svelte:window bind:scrollY={y_pos} />

<header id="header" class="fixed z-50 w-full flex flex-col justify-between lg:flex-row lg:items-center lg:justify-items-center lg:py-4 lg:px-8 bg-theme-white dark:bg-theme-black dark:text-theme-text-white lg:bg-transparent dark:lg:bg-transparent backdrop-blur-md
    {showMobileMenu ? 'dark:shadow-theme-shadow-dark shadow-b-xl lg:shadow-none rounded-b-xl lg:rounded-none' : ''}
    " bind:clientWidth={windowWidth} bind:this={header}>
    <div class="flex flex-row justify-between items-center lg:hidden px-6">
        <button on:click={toggleMobileMenu} class="flex-1 py-6">
            {#if showMobileMenu}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-theme-red">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            {:else}              
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-theme-green">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/if}
        </button>
        <a on:click={closeMenu} href="/" class="float-right">
            <div class="text-xl font-bold text-center flex flex-row items-baseline"><span class="text-theme-green">creditcard</span><span class="text-[7px] leading-4">&#9632;</span><span class="text-theme-brown">cafe</span></div>
        </a>
    </div>
    {#if showMobileMenu || windowWidth >= 1024}
    <a on:click={() => closeMenu()} href="/" class="hidden lg:inline float-right">
        <div class="text-xl font-bold text-center flex flex-row items-baseline"><span class="text-theme-green">creditcard</span><span class="text-[7px] leading-4">&#9632;</span><span class="text-theme-brown">cafe</span></div>
    </a>
    <SearchBar on:closeMenu={closeMenu}></SearchBar>
    <hr class="lg:hidden w-full mt-2 justify-end">
    <nav class="inline-flex flex-col lg:flex-row text-theme-black dark:text-theme-text-white items-start lg:items-center border-theme-text-white pb-2 lg:pb-0 relative pointer-events-auto">
        <a on:click={closeMenu}       class="py-6 lg:py-3 px-3 mx-2 hover:bg-black/[0.1] hover:rounded transition-all w-full lg:w-fit border-b-2 lg:border-b-0 border-inherit" href="/">Discover</a>
        <a on:click={closeMenu}       class="py-6 lg:py-3 px-3 mx-2 hover:bg-black/[0.1] hover:rounded transition-all w-full lg:w-fit border-b-2 lg:border-b-0 border-inherit" href="/community">Community</a>
        <a on:click={closeMenu}       class="py-6 lg:py-3 px-3 mx-2 hover:bg-black/[0.1] hover:rounded transition-all w-full lg:w-fit border-b-2 lg:border-b-0 border-inherit" href="/account" >My Cards</a> 
        <button on:click={expandMenu} class="py-6 lg:py-3 px-3 mx-2 hover:bg-black/[0.1] hover:rounded transition-all w-full lg:w-fit text-left">
            <span class="text-left lg:hidden">Settings</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="hidden lg:inline size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>  
        </button>   
        {#if showExpandedMenu} 
        <div class='p-6 absolute lg:top-16 lg:-right-8 w-full bg-theme-white dark:bg-theme-black dark:text-theme-text-white shadow-b-xl lg:border-l-2 border-b-2 dark:border-theme-text-white backdrop-blur-md lg:rounded-bl-lg lg:rounded-br-none rounded-b-lg'>
            <DarkToggle on:toggleTheme={toggleTheme} on:respectSystemPreference={respectSystemPreference} theme={theme}></DarkToggle>
        </div>   
        {/if}
    </nav> 
    {/if}
</header>

<style>
    hr {
        border: 2px solid #d6c0a5;
    }
</style>