<script lang="ts">
    import type { BankObject, BankType } from "$lib/types";
    export let bank:BankObject;

</script>

<div id="bankInfo" class="lg:mx-6 flex flex-1 flex-col items-center lg:block">
    {#if bank.bank_name}
        <div class="inline-flex flex-col items-center mb-12">
            <div class="pb-8 text-6xl lg:text-8xl text-center font-semibold dark:text-theme-text-white">{bank.bank_name}</div>
            <hr class="my-4 border-2 border-theme-text-white w-11/12 ">
        </div>
    {/if}

</div>
