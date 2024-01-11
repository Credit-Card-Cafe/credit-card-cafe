<script lang="ts">
    import type {UpdateTypeField, UpdateTypeList, UpdateTypeObjectField, UpdateTypeValue} from "$lib/types"
    export let field: UpdateTypeField;
    export let value: UpdateTypeValue;
    export let object: UpdateTypeObjectField = undefined;
    export let list: UpdateTypeList = undefined;
    import { dataField } from "$lib/fields";
    import { newCard } from "$lib/stores";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    const dispatch:any = createEventDispatcher();
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
    {#if list && typeof field === "number"}
        {list[field]} purchases 
    {:else if object} 
        {dataField[object]["data"][field].name} 
    {:else if typeof field === 'string'} 
        {dataField[field].name} 
    {/if}
    {#if typeof field === 'string'}
    <input type="text" class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value on:input={() => setUpdate()}>
    {:else}
        <input type="text" class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value on:input={dispatch("add", {value: value, index: field})}>
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
        padding: 0.35rem;
    }
</style>