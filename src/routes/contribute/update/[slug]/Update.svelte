<script lang="js">
	export let card;
    export let updateAuthorization;
    import {createEventDispatcher, onDestroy } from "svelte";
    import { newCard } from "../../../../lib/stores";
    import {dataField} from "../../../../lib/fields";
    import CreditCard from "../../../../components/CreditCard.svelte";

    import TextInput from "./components/TextInput.svelte";
    import SelectInput from "./components/SelectInput.svelte";
    import ObjectInput from "./components/ObjectInput.svelte";
    import RadioInput from "./components/RadioInput.svelte";
    import ColorInput from "./components/ColorInput.svelte";
    import ListInput from "./components/ListInput.svelte";
    import NumberInput from "./components/NumberInput.svelte";

    console.log("Update.svelte load")

    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');

    onDestroy(() => {
        $newCard = {};
    })

    $newCard.id = card.url;
</script>

{#if updateAuthorization}
<div id="card">
    {#if Object.hasOwn($newCard, "color")}
        <CreditCard card={card} --color="{$newCard.color}"></CreditCard>
    {:else}
        <CreditCard card={card} --color="{card.color}"></CreditCard>
    {/if}
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
            {/if}
        {/each}
        <button on:click={() => submit()}>Submit Changes</button>
</div>
<div> 
    Update:
    <pre id="e">{JSON.stringify($newCard)}</pre>

    <pre id="e">{JSON.stringify(card)}</pre>
</div>
{:else}
<div id="after">
    Thx.
</div>
{/if}

<style>
 button {
    margin-top: 10px;
 }
</style>