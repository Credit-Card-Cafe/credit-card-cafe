<script lang="ts">
    import type { BankType } from "$lib/types";
    export let bank:BankType;

</script>

<div id="bankInfo">
    {#if bank.name}
        <div class="pb-8 text-xl text-center">Showing cards offered by {bank.name}</div>
    {/if}
</div>