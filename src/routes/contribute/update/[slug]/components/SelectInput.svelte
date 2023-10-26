<script>
    export let field;
    export let value;
    export let object = false;
    export let list = false;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    const dispatch = createEventDispatcher();
    const checkObject = () => dispatch('update')
    
    function setUpdate() {
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = value;
            checkObject();
        } else {
            $newCard[field] = value;
            if (value == defaultValue || (!defaultValue && value == "")) {
                delete $newCard[field];
            }
        }
    }
</script>

<div class={value === undefined ? 'undef' : ''}>
    {#if list}
        {field}
        <select bind:value on:change={() => dispatch('add', value)}>
            {#each Object.keys(list) as option}
                <option value={option}>{list[option]}</option>
            {/each}
        </select>
    {:else if object} 
        {dataField[object]["data"][field].name}
        <select bind:value on:change={() => setUpdate()} >
            <option disabled selected>{value}</option>
            {#each dataField[object]["data"][field].options as option}
                <option>{option}</option>
            {/each}
        </select>
    {:else}
        {dataField[field].name}
        <select bind:value on:change={() => setUpdate()} >
            <option disabled selected>{value}</option>
            {#each dataField[field].options as option}
                <option>{option}</option>
            {/each}
        </select>
    {/if}
</div>

<style>
    div {
        padding: 1rem;
    }
    .undef {
        margin-top: 0.25rem;
        border: 1px solid red;
        border-radius: 5px;
    }
</style>