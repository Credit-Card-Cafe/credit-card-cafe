<script lang="ts">
    export let field: UpdateTypeField;
    export let value: number;
    export let object: UpdateTypeObjectField = undefined;
    export let dynamicObject: UpdateTypeDynamic = undefined;
    import { dataField} from "$lib/fields";
    import { newCard } from "$lib/stores";
    import type { UpdateTypeDynamic, UpdateTypeField, UpdateTypeList, UpdateTypeObjectField } from "$lib/types";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    const dispatch = createEventDispatcher();
    const checkObject = () => dispatch('update')

    $: if (value < 0) {
        value = 0;
    }

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
                if (value == defaultValue || (!defaultValue && value == null) ) {
                    delete $newCard[field];
                }
            }
        }
    }
</script>


<div class={`${value === undefined ? 'undef' : ''} bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700`}>
    {#if dynamicObject} {dynamicObject[field]} purchases {:else if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="number" min="0" bind:value on:input={() => setUpdate()}>
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