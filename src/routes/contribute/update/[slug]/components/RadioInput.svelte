<script>
    export let field;
    export let value;
    export let object = false;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    var group = value;

    const dispatch = createEventDispatcher();
    const checkObject = () => dispatch('update')

    function setUpdate() {
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = group;
            checkObject();
        } else {
            $newCard[field] = group;
            if (group == defaultValue || (!defaultValue && group == "")) {
                delete $newCard[field];
            }
        }        
    }
</script>

<div class={value === undefined ? 'undef' : ''}>
    {#if object} 
        {dataField[object]["data"][field].name}: 
        {#each dataField[object]["data"][field].options as option}
            <input type="radio" value={option} bind:group on:change={() => setUpdate()}>
            <span>{option}</span>
        {/each}
    {:else} 
        {dataField[field].name}: 
        {#each dataField[field].options as option}
            <input type="radio" value={option} bind:group on:change={() => setUpdate()}>
            <span>{option}</span>
        {/each}
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