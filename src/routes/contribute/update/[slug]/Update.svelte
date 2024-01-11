<script lang="ts">
	export let card: CreditCardType;
    export let updateAuthorization: boolean;
    import {createEventDispatcher, onDestroy, onMount } from "svelte";
    import { newCard, admin } from "$lib/stores";
    import {dataField} from "$lib/fields";
    import CreditCard from "components/CreditCard.svelte";

    import TextInput from "./components/TextInput.svelte";
    import SelectInput from "./components/SelectInput.svelte";
    import ObjectInput from "./components/ObjectInput.svelte";
    import RadioInput from "./components/RadioInput.svelte";
    import ColorInput from "./components/ColorInput.svelte";
    import ListInput from "./components/ListInput.svelte";
    import NumberInput from "./components/NumberInput.svelte";
    import DynamicInput from "./components/DynamicInput.svelte";
    import UploadInput from "./components/UploadInput.svelte";
    import type { CreditCardType } from "$lib/types";

    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');

    onDestroy(() => {
        $newCard = undefined;
    })

    onMount(() => {
        if (!$newCard) {
            $newCard = {
                id: card.id,
                name: card.name,
            }
        }
    })

</script>

{#if updateAuthorization}
<div class="flex flex-col items-center mb-4 pt-16">
    {#if $newCard && $newCard.color}
        <CreditCard card={card} --color="{$newCard.color}"></CreditCard>
    {:else}
        <CreditCard card={card} --color="{card.color}"></CreditCard>
    {/if}
    <div class="mt-20 flex flex-col align-baseline dark:text-white-warm">
        {#each Object.keys(dataField) as field}
            {#if dataField[field].type == "text"}
                <TextInput field={field} value={card[field]}></TextInput>
            {:else if dataField[field].type == "select"}
                <SelectInput field={field} value={card[field]}></SelectInput>
            {:else if dataField[field].type == "object"}
                <ObjectInput field={field} object={card[field]}></ObjectInput>
            {:else if dataField[field].type == "radio"}
                <RadioInput field={field} value={card[field]}></RadioInput>
            {:else if dataField[field].type == "color"}
                <ColorInput field={field} value={card[field]}></ColorInput>
            {:else if dataField[field].type == "list"}
                <ListInput field={field} list={card[field]}></ListInput>
            {:else if dataField[field].type == "number"}
                <NumberInput field={field} value={card[field]}></NumberInput>
            {:else if dataField[field].type == "dynamic"}
                <DynamicInput field={field} object={card[field]}></DynamicInput>
            {:else if dataField[field].type == "upload"}
                <UploadInput field={field} value={card[field]}></UploadInput>
            {/if}
        {/each}
    </div>
    {#if $admin}
        <button on:click={() => submit()} class="bg-green-500 btn disabled:text-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 hover:bg-green-700">Update Card</button>
    {:else}
        <button on:click={() => submit()} class="bg-green-500 btn disabled:text-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 hover:bg-green-700">Submit Changes</button>
    {/if}
</div>
    {#if $admin}
    <div style="display: grid; grid-template-columns: 25% 25% 25%; gap: 2rem; margin: 2rem; overflow: hidden;"> 
        <div>Update Object:</div>
        <pre>{JSON.stringify($newCard,null,1)}</pre>

        <pre>{JSON.stringify(card, null, 1)}</pre>
    </div>
    {/if}
{:else}
<div id="after">
    Thank you for submitting an update. We will review and implement the changes as soon as possible.
</div>
{/if}

<style>
 .btn {
    @apply text-white font-bold py-2 text-3xl px-4 rounded-lg transition-all mt-4 mb-8;
 }
</style>