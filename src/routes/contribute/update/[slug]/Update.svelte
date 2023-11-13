<script lang="js">
	export let card;
    export let updateAuthorization;
    import {createEventDispatcher, onDestroy, onMount } from "svelte";
    import { newCard, admin, oneCard } from "../../../../lib/stores";
    import {dataField} from "../../../../lib/fields";
    import CreditCard from "../../../../components/CreditCard.svelte";

    import TextInput from "./components/TextInput.svelte";
    import SelectInput from "./components/SelectInput.svelte";
    import ObjectInput from "./components/ObjectInput.svelte";
    import RadioInput from "./components/RadioInput.svelte";
    import ColorInput from "./components/ColorInput.svelte";
    import ListInput from "./components/ListInput.svelte";
    import NumberInput from "./components/NumberInput.svelte";
    import DynamicInput from "./components/DynamicInput.svelte";
    import UploadInput from "./components/UploadInput.svelte";

    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');

    onDestroy(() => {
        $newCard = {};
    })

    $newCard.id = card.id;
</script>

{#if updateAuthorization}
<div id="card">
    {#if Object.hasOwn($newCard, "color")}
        <CreditCard card={card} --color="{$newCard.color}"></CreditCard>
    {:else}
        <CreditCard card={card} --color="{card.color}"></CreditCard>
    {/if}
    <div id="updateFields">
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
        <button on:click={() => submit()}>Update Card</button>
    {:else}
        <button on:click={() => submit()}>Submit Changes</button>
    {/if}
</div>
    {#if $admin}
    <div style="display: flex; flex-direction: row; justify-content: space-around;"> 
        Update:
        <pre>{JSON.stringify($newCard,null,1)}</pre>

        <pre>{JSON.stringify(card, null, 1)}</pre>
    </div>
    {/if}
{:else}
<div id="after">
    Thx.
</div>
{/if}

<style>
 #card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10rem;
 }
 #updateFields {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: baseline;
 }
 button {
    margin-top: 2rem;
    border: 2px solid silver;
    background-color: rgb(253,248,244);
    padding: 1rem;
    font-size: 2rem;
    border-radius: 10px;
    -webkit-transition: background-color 100ms linear;
    -ms-transition: background-color 100ms linear;
    transition: background-color 100ms linear;
 }
 button:hover {
    background-color: silver;
    padding: 1rem;
    font-size: 2rem;
    border-radius: 10px;
 }
</style>