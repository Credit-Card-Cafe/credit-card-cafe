<script lang="ts">
    import type { CreditCardType } from "$lib/types";
    export let card:CreditCardType;
</script>

<div class="text-4xl text-center lg:py-6 mb-6">{card.name}</div>