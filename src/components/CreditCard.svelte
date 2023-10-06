<script lang="js">
	export let card;
</script>

<div id="card">
    {#if card.bank}
    <div id="bank">{card.bank}</div>
    {/if}
    {#if card.name}
    <div id="name">{card.name}</div>
    {/if}
    {#if card.network}
    <div id="network">{card.network}</div>
    {/if}
    {#if card.annual_fee}
    <div id="annual-fee">{card.annual_fee}</div>
    {/if}
</div>

<style>
    #bank {
        background: rgb(201, 255, 201);
    }
    #name {
        background: rgb(201, 255, 242);
    }
    #network {
        background: rgb(201, 225, 255);
    }
    #annual-fee {
        background: rgb(211, 201, 255);
    }
</style>

