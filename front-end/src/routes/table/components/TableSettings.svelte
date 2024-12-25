<script lang="ts">
    import { TLS } from "$lib/types";
    export let selection:TLS = TLS.Both;
    export let showAdvancedQueries:boolean;
    export let useAcronyms:boolean;
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";

    let localUser = convertJSONtoUser($localUserData)

    function setTS() {
        localUser.table_setting_acronym = useAcronyms;
        localUser.table_setting_advanced = showAdvancedQueries;
        localUser.table_setting_userselection = selection;
        $localUserData = JSON.stringify(localUser)
    }

    $: useAcronyms, setTS()
    $: showAdvancedQueries, setTS()
    $: selection, setTS()

</script>

<div class="flex flex-col lg:flex-row justify-start lg:items-center gap-y-4 gap-x-8">
    <div class="flex flex-row justify-start items-center rounded-md py-1 px-2 bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov"><input class="h-6 w-6 accent-theme-blue mx-2" type="checkbox" bind:checked={showAdvancedQueries} id="showAdvancedQueries"><label class="mr-2 p-1" for="showAdvancedQueries">Show Advanced Queries</label></div>
    <div class="flex flex-row justify-start items-center rounded-md py-1 px-2 bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov"><input class="h-6 w-6 accent-theme-blue mx-2" type="checkbox" bind:checked={useAcronyms} id="useAcronyms"><label class="mr-2 p-1" for="useAcronyms">Use Acronyms</label></div>
    
    <div class="inline-flex flex-row flex-wrap justify-center items-center rounded-md py-2 lg:py-1 px-2 bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov">
        <span class="ml-1 mr-2 w-full lg:w-auto text-center">Show Cards From</span>
        <input type="radio" id="tls_wallet" name="tls" value={TLS.Wallet} bind:group={selection} class="hidden">
        <label for="tls_wallet" class={`text-center bg-theme-lightgray hover:text-black py-1 px-4 inline-block mx-1 transition-all cursor-pointer rounded-full dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov ${selection == TLS.Wallet ? "bg-theme-yellow hover:bg-theme-yellow-hov dark:bg-theme-yellow dark:hover:bg-theme-yellow-hov dark:text-black" : ""}`}>Wallet</label>
    
        <input type="radio" id="tls_both" name="tls" value={TLS.Both} bind:group={selection} class="hidden">
        <label for="tls_both" class={`text-center bg-theme-lightgray hover:text-black py-1 px-4 inline-block mx-1 transition-all cursor-pointer rounded-full dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov ${selection == TLS.Both ? "bg-theme-yellow hover:bg-theme-yellow-hov dark:bg-theme-yellow dark:hover:bg-theme-yellow-hov dark:text-black" : ""}`}>Both</label>
    
        <input type="radio" id="tls_tracking" name="tls" value={TLS.Tracking} bind:group={selection} class="hidden">
        <label for="tls_tracking" class={`text-center bg-theme-lightgray hover:text-black py-1 px-4 inline-block ml-1 transition-all cursor-pointer rounded-full dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov ${selection == TLS.Tracking ? "bg-theme-yellow hover:bg-theme-yellow-hov dark:bg-theme-yellow dark:hover:bg-theme-yellow-hov dark:text-black" : ""}`}>Tracked</label>
    </div>
</div>