<script lang="ts">
    import { getCardsFromIDList } from "$lib/functions";
    import Table from "../components/Table.svelte";
    export let data;
    
    const cardList = data.category?.list

    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";

    let localUser = convertJSONtoUser($localUserData)

    let tableSettingsData = {
        table_setting_acronym: localUser.table_setting_acronym,
        table_setting_advanced: localUser.table_setting_advanced,
        table_setting_queries: localUser.table_setting_queries,
        table_setting_userselection: localUser.table_setting_userselection
    }

</script>

{#if cardList}
    {#await getCardsFromIDList(cardList)}
        <Table tablelist={[]} walletIDList={[]} trackingIDList={[]} bind:settings={tableSettingsData} tableCall={1}></Table>
    {:then tableList} 
        <div class="text-3xl md:text-6xl font-semibold text-center">{data.category?.title}</div>
        <Table tablelist={tableList} walletIDList={[]} trackingIDList={[]} settings={tableSettingsData} tableCall={1}></Table>
    {/await}
{:else}
    <main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black">
    <div class="text-xl md:text-2xl font-semibold text-center my-20">Error: Table List Doesn't Exist</div>
    <div class="text-2xl md:text-6xl font-semibold text-center mb-20">That's one too many syllables there, bub</div>
    </main>
{/if}
