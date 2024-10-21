<script lang="ts">
    import { goto } from '$app/navigation';

    function search() {
        if (value.replace(/ /g, '') != "") {
            goto(`/search?q=${value}`);
            value = "";
        }
    }

    let value = "";


</script>

<form on:submit|preventDefault={() => search()} class="flex">
    <div class="bg-theme-lightgray/65 border rounded-lg mx-auto md:mx-4 my-4 md:my-0 p-2 flex flex-row items-center text-black focus-within:outline-theme-blue focus-within:outline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 md:hidden lg:inline sm:inline">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>              
        <input class="border-none bg-transparent radius-0 focus:outline-none" type="text" bind:value placeholder="Search Cards...">
        <button class="block px-4 text-center hover:text-theme-text-black-hov transition-all md:hidden lg:inline sm:inline flex flex-row items-center" on:click={() => search()}>Search 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>        
        </button>
    </div>
</form>
