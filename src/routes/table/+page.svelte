<script lang="ts">
    import { getCardsFromIDList } from "$lib/functions";
    import Table from "./components/Table.svelte";
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";

    const localUser = convertJSONtoUser($localUserData)

</script>

{#if localUser}
    {#await getCardsFromIDList([...localUser.wallet, ...localUser.tracking])}
        <Table tablelist={[]}></Table>
    {:then tableList} 
        <Table tablelist={tableList}></Table>
    {/await}
{:else}
    <div>Sign up / Log in to compare cards! (Although we should be able to do this without an account)</div>
{/if}
