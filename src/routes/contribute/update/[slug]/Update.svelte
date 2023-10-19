<script lang="js">
	export let card;
    export let updateAuthorization;
    import {createEventDispatcher, onDestroy } from "svelte";
    import {dataField} from "../../../../lib/fields";
    import TextInput from "./components/TextInput.svelte";
    import SelectInput from "./components/SelectInput.svelte";
    import ObjectInput from "./components/ObjectInput.svelte";
    import CreditCard from "../../../../components/CreditCard.svelte";
    import { newCard } from "../../../../lib/stores";

    const dispatch = createEventDispatcher();
    const submit = () => dispatch('submit');

    onDestroy(() => {
        $newCard = {};
    })
</script>

{#if updateAuthorization}
<div id="card">
    <CreditCard card={card} --color="{card.color}"></CreditCard>
        {#each Object.keys(dataField) as field}
            {#if dataField[field].type == "text"}
                <TextInput field={field} value={card[field]}></TextInput>
            {:else if dataField[field].type == "select"}
                <SelectInput field={field} value={card[field]}></SelectInput>
            {:else if dataField[field].type == "object"}
                <ObjectInput field={field} object={card[field]}></ObjectInput>
            {/if}
        {/each}
        <button on:click={submit}>Submit Changes</button>
</div>
<div> 
    Update:
    <pre id="e">{JSON.stringify($newCard)}</pre>
    
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