<script lang="ts">
    import type { BankType } from "$lib/types";
    export let bank:BankType;

</script>

<div id="bankInfo">
    {#if bank}
        {#if bank.name}
            <div id="title">{bank.name}</div>
        {/if}
        {#if bank.info}
            <div id="info">{bank.info}</div>
        {/if}
    {:else}
    There is no information pertaining this bank. 
    {/if}
</div>

<style>
    #bankInfo {
        border: 1px solid black;
        border-radius: 10px;
        padding: 5rem;
        max-width: 40%;
        max-height: min-content;
    }
    #title {
        font-size: large;
        font-weight: 700;
    }
</style>