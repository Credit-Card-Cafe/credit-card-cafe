<script lang="ts">
    import { getCardsFromIDList } from "$lib/functions";
    import Table from "./components/Table.svelte";
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";

    let localUser = convertJSONtoUser($localUserData)
</script>

{#if localUser}
    {#await getCardsFromIDList([...localUser.wallet, ...localUser.tracking])}
        <Table tablelist={[]} walletIDList={[]} trackingIDList={[]}></Table>
    {:then tableList} 
        <Table tablelist={tableList} walletIDList={localUser.wallet} trackingIDList={localUser.tracking}></Table>
    {/await}
{:else}
    <div>Sign up / Log in to compare cards! (Although we should be able to do this without an account)</div>
{/if}
