<script lang="ts">
    import type { BankType } from "$lib/types";
    import Modifiers from "./Modifiers.svelte";
    export let bank:BankType;

</script>

<div id="bankInfo" class="lg:mx-6 flex flex-1 flex-col items-center lg:block">
    {#if bank.name}
        <div class="inline-flex flex-col items-center mb-12">
            <div class="pb-8 text-6xl lg:text-8xl text-center font-semibold">{bank.name}</div>
            <hr class="my-4 border-2 border-white-warm w-11/12 ">
        </div>
    {/if}
    

{#if bank.modifiers}
    <div class="mb-12 p-4">
        <div class="my-2 lg:mx-2 lg:w-auto p-2 rounded-md inline">Apply Modifiers:</div>
        <Modifiers bank={bank}></Modifiers>
    </div>
{/if}

</div>
