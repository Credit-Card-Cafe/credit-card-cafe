<script lang="ts">
    import { getCardsFromIDList, getCardsFromURLList } from "$lib/functions";
    import Table from "./components/Table.svelte";
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

<!-- <main> tag in Table component-->
{#if localUser && localUser.wallet && localUser.wallet.length > 0 || localUser.tracking && localUser.tracking.length > 0}
    {#await getCardsFromIDList([...localUser.wallet, ...localUser.tracking])}
        <Table tablelist={[]} walletIDList={[]} trackingIDList={[]} bind:settings={tableSettingsData} tableCall={0}></Table>
    {:then tableList} 
        <Table tablelist={tableList} walletIDList={localUser.wallet} trackingIDList={localUser.tracking} settings={tableSettingsData} tableCall={0}></Table>
    {/await}
{:else}
    {#await getCardsFromURLList(['bofa-ccr', 'chase-freedom-unlimited', 'penfed-platinum'])}
    <Table tablelist={[]} walletIDList={[]} trackingIDList={[]} bind:settings={tableSettingsData} tableCall={2}></Table>
    {:then tableList} 
    <Table tablelist={tableList} walletIDList={[]} trackingIDList={[]} settings={tableSettingsData} tableCall={2}></Table>
    {/await}
{/if}
