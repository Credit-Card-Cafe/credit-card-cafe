<script lang="ts">
    import { parseDatabaseString } from "$lib/functions";
    import { COP, type ModifiedCardObject } from "$lib/types";
    import CreditCard from "global-components/CreditCard.svelte";
    import CardName from "global-components/CardName.svelte";

    export let card: ModifiedCardObject;
</script>

<div class="my-4 mx-2 px-8 py-6 shadow-lg lg:shadow-md lg:shadow-current border-2 lg:border-none rounded-2xl" style="border-color:{card.card_color}; --tw-shadow-color:{card.card_color}">
    <CreditCard card={card} showTrackCard={true}></CreditCard>
    <CardName card={card} fontSize={"medium"}></CardName>
    <table class="table-auto mt-8 lg:mr-8">
        <tr class="font-semibold text-2xl">
            <td class="w-full">{parseDatabaseString(card, COP.card_af)}</td>
            <td class="w-full">{parseDatabaseString(card, COP.card_ftf)}</td>
        </tr>
        <tr class="text-xl font-light">
            <td class="pb-4">Annual Fee</td>
            <td class="pb-4">FTF</td>
        </tr>
        <tr class="font-semibold text-2xl">
            <td>{parseDatabaseString(card, COP.card_network)}</td>
            <td>{parseDatabaseString(card, COP.card_type)}</td>
        </tr>
        <tr class="text-xl font-light">
            <td>Network</td>
            <td>Card Type</td>
        </tr>
    </table>
</div>