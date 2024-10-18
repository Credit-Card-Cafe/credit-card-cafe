<script>
    import { getCardsFromIDList } from "$lib/functions";
    import Table from "../components/Table.svelte";
    export let data;
    
    const cardList = data.category?.list

</script>

{#if cardList}
    {#await getCardsFromIDList(cardList)}
        <Table tablelist={[]} walletIDList={[]} trackingIDList={[]}></Table>
    {:then tableList} 
        <div class="text-3xl md:text-6xl font-semibold text-center">{data.category?.title}</div>
        <Table tablelist={tableList} walletIDList={[]} trackingIDList={[]}></Table>
    {/await}
{:else}
    <div class="text-xl md:text-2xl font-semibold text-center my-20">Error: Table List Doesn't Exist</div>
    <div class="text-2xl md:text-6xl font-semibold text-center mb-20">That's one too many syllables there, bub</div>
{/if}
