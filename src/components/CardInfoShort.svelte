<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let card:CreditCardType;
</script>

<div class="opacity-0 group-hover:opacity-100 absolute top-6 left-0 group-hover:left-[3.30in] -z-10 p-4 bg-alt w-72 border-coolGray-900 border-2 rounded-md transition-all delay-200"> 
    <b>{card.name}</b>
    <b>{card.bank}</b>
</div>

