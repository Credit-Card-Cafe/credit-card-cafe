<script lang="ts">
    import { getCardsFromIDList } from "$lib/functions";
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
{#if localUser}
    {#await getCardsFromIDList([...localUser.wallet, ...localUser.tracking])}
        <Table tablelist={[]} walletIDList={[]} trackingIDList={[]} bind:settings={tableSettingsData}></Table>
    {:then tableList} 
        <Table tablelist={tableList} walletIDList={localUser.wallet} trackingIDList={localUser.tracking} settings={tableSettingsData}></Table>
    {/await}
{:else}
    <div>Sign up / Log in to compare cards! (Although we should be able to do this without an account)</div>
{/if}
