<script lang="ts">
    import TableData from "./TableData.svelte";
    import TableQuery from "./TableQuery.svelte";
    import {type COData, type CardObject, COP, TLS } from "$lib/types";
    import { injectBankToCard, injectBrandToCard } from "$lib/functions";
    import { cardFieldNames } from "$lib/fields";
    import TableSettings from "./TableSettings.svelte";
    import { onMount } from "svelte";

    export let tablelist:CardObject[];
    export let walletIDList:string[];
    export let trackingIDList:string[];

    export let settings: {
        table_setting_acronym: boolean | undefined,
        table_setting_advanced: boolean | undefined,
        table_setting_queries: COP[] | undefined,
        table_setting_userselection: TLS | undefined
    };
    
    let cardIDList:string[]
    let userSelection = settings.table_setting_userselection ? settings.table_setting_userselection : TLS.Both;
    let showAdvancedQueries = settings.table_setting_advanced ? settings.table_setting_advanced : false;
    let useAcronyms = settings.table_setting_acronym ? settings.table_setting_acronym : false;
    let showSettings = false;

    //default queries 
    var selectedQueries:COP[] = settings.table_setting_queries ? settings.table_setting_queries : [COP.card_network, COP.card_af, COP.card_ftf, COP.card_apr];
    let availableQueries: COP[] = Object.values(COP).filter((prop): prop is COData =>
        prop !== COP.card_id &&
        prop !== COP.card_name &&
        prop !== COP.card_bank &&
        prop !== COP.card_url &&
        prop !== COP.card_link &&
        prop !== COP.card_color &&
        prop !== COP.card_image
    );

    const advancedQueries = [COP.card_auc, COP.card_btapr, COP.card_btf, COP.card_caapr, COP.card_caf, COP.card_chip, COP.card_embossed, COP.card_il, COP.card_lpapr, COP.card_lpf, COP.card_material, COP.card_redemption, COP.card_subq, COP.card_subt, COP.card_subv, COP.card_ttp, COP.card_weight]

    function setAvailableQueries() {
        if (showAdvancedQueries) availableQueries = [...new Set([...availableQueries, ...advancedQueries])]
        else availableQueries = availableQueries.filter(item => !advancedQueries.includes(item) || selectedQueries.includes(item))
        settings.table_setting_advanced = showAdvancedQueries
    }
    
    $: showAdvancedQueries, setAvailableQueries();

    $: cardIDList = (() => {
        if (userSelection == TLS.Wallet) {
            return walletIDList;
        } else if (userSelection == TLS.Tracking) {
            return trackingIDList;
        } else if (userSelection == TLS.Both) {
            return [...walletIDList, ...trackingIDList];
        } else {
            return [];
        }
    })();

    if (tablelist.length > 0) {
        Promise.all(
            tablelist.map(async (card) => {
                let updatedCard = await injectBankToCard(card);
                if (card.card_brand) {
                    updatedCard = await injectBrandToCard(card);
                }
                return updatedCard;
            })
        ).then((updatedTablelist) => {
            tablelist = updatedTablelist;
        });
    }

    function order(param:COP) {
        ; // Sort table by param 
    }

    function cardName(query:COP) {
        if (useAcronyms) {
            let words = cardFieldNames[query].split(' ');
            let newString = ""
            if (words.length > 1) {
                words.forEach((word) => {newString += word[0]})
                return newString;
            }
        } 
        return cardFieldNames[query];  
    }
    
    onMount(() => {
        if (settings.table_setting_acronym) useAcronyms = settings.table_setting_acronym
        if (settings.table_setting_advanced) showAdvancedQueries = settings.table_setting_advanced
        if (settings.table_setting_queries) selectedQueries = settings.table_setting_queries
        if (settings.table_setting_userselection) userSelection = settings.table_setting_userselection
    })
</script>

<main class="flex flex-col px-4">
    <div class="mb-6 md:mb-10 flex flex-row flex-wrap justify-center">
        {#each availableQueries as property}
            <TableQuery field={property} bind:queries={selectedQueries} cardName={cardName} useAcronyms={useAcronyms}></TableQuery>
        {/each}
        <button on:click={() => {showSettings = !showSettings}} class={`text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-colors cursor-pointer 
        ${showSettings ? 
        "bg-theme-blue hover:bg-theme-blue-hov dark:text-theme-text-white text-theme-text-black" : 
        "bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-darkgray-hov"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>              
        </button>
    </div>
    {#if showSettings}
        <TableSettings bind:selection={userSelection} bind:useAcronyms={useAcronyms} bind:showAdvancedQueries={showAdvancedQueries}></TableSettings>
    {/if}
    {#if tablelist.length < 1}
    <div class="hidden md:block text-center text-sm">Track cards or add cards to your wallet to view them on the table!</div>
    {/if}

    <div class="w-full overflow-x-scroll">
    <table class="dark:text-white-warm max-w-fit rounded-r-xl table-fixed overflow-x-scroll">
        <!--   Table Header   -->
        <tr class="hidden md:table-row">
            <th>Card</th>
            <th><button on:click={() => order(COP.card_bank)}>Bank</button></th>
            {#key useAcronyms}
                {#each selectedQueries as query}
                    <th><button on:click={() => order(query)}>{cardName(query)}</button></th>
                {/each}
            {/key}
        </tr>
        <!---------------------->



        <!--    Table Data    -->
        {#each tablelist as card}
            {#if card.card_id && cardIDList.includes(card.card_id) || !(walletIDList.length > 0 && trackingIDList.length > 0)}
            <tr class="even:bg-theme-green/25 dark:even:bg-inherit dark:border-t-2 dark:border-theme-green/10">
                <td class="flex md:table-cell flex-col items-center md:text-left odd:rounded-xl md:odd:rounded-r-none md:odd:rounded-l-xl">
                    <a href="/card/{card.card_url}" class="font-medium mb-6 md:mb-0 md:font-normal">{card.card_name}</a>
                </td>
                <td class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell">{#if card.card_bank}<a href="/bank/{card.card_url}">{card.card_bank}</a>{:else}{card.card_bank}{/if}</td>
                <TableData class="even:bg-black/5 odd:last:rounded-r-xl hidden md:table-cell" queries={selectedQueries} card={card}></TableData>
            </tr>
            {/if}
        {/each}
        <!---------------------->


    </table>
    </div>
</main>

<style>
    th, td {
        @apply p-4;
    }
</style>