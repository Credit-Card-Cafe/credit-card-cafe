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
        {list[field]} purchases 
    {:else if object} 
        {dataField[object]["data"][field].name} 
    {:else if isNaN(field)} 
        {dataField[field].name} 
    {/if}
    {#if isNaN(field)}
    <input type="text" bind:value on:input={() => setUpdate()}>
    {:else}
        <input type="text" bind:value on:input={() => dispatch("add", {value: value, index: field})}>{field}
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
    input {
        margin-left: 0.75rem;
    }
</style>