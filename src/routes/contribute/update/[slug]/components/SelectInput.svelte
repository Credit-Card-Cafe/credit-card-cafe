<script>
    export let field;
    export let value;
    export let object = false;
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

<div>
    {#if object} 
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

</style>