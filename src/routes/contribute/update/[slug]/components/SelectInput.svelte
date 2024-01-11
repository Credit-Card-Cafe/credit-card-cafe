<script lang="ts">
    export let field:UpdateTypeField;
    export let value:UpdateTypeValue;
    export let object:UpdateTypeObjectField = undefined;
    export let dynamicObject:UpdateTypeDynamic  = undefined;
    import { dataField} from "$lib/fields";
    import { newCard } from "$lib/stores";
    import type { UpdateTypeDynamic, UpdateTypeField, UpdateTypeList, UpdateTypeObjectField, UpdateTypeValue } from "$lib/types";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    const dispatch = createEventDispatcher();
    const checkObject = () => dispatch('update')
    
    function setUpdate() {
        if ($newCard) {
            if (object) {
                if (!$newCard[object]) {
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
    }
</script>

<div class={value === undefined ? 'undef' : ''}>
    {#if dynamicObject}
        {field}
        <select bind:value on:change={() => dispatch('add', value)}>
            {#each Object.keys(dynamicObject) as option}
                <option value={option}>{dynamicObject[option]}</option>
            {/each}
        </select>
    {:else if object} 
        {dataField[object]["data"][field].name}
        <select class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value on:change={() => setUpdate()} >
            <option disabled selected>{value}</option>
            {#each dataField[object]["data"][field].options as option}
                <option>{option}</option>
            {/each}
        </select>
    {:else}
        {dataField[field].name}
        <select class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value on:change={() => setUpdate()} >
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