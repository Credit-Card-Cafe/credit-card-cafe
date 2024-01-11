<script lang="ts">
    import type {RGB, HEX, UpdateTypeField, UpdateTypeObjectField} from '$lib/types'
    export let field: UpdateTypeField;
    export let value: RGB | HEX;
    export let object: UpdateTypeObjectField = undefined;
    import { dataField } from "$lib/fields";
    import { newCard } from "$lib/stores";
    import { hexToRgb, rgbToHex } from "$lib/functions";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    const dispatch = createEventDispatcher();
    const checkObject = () => dispatch('update')

    if (defaultValue == undefined) {
        value = "#FFEE2D6"
    } else {
        value = rgbToHex(value as RGB)
    }
    

    function setUpdate() {
        let color = hexToRgb(value as HEX);
        if ($newCard) {
            if (object) {
                if (!$newCard[object]) {
                    $newCard[object] = {};
                }
                $newCard[object][field] = value;
                checkObject();
            } else {
                $newCard[field] = color;
                if (JSON.stringify(color) == JSON.stringify(defaultValue) || (!defaultValue && color.length != 3)) {
                    delete $newCard[field];
                }
            }
        }
    }
</script>


<div class={value === undefined ? 'undef' : ''}>
    {#if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="color" bind:value on:input={() => setUpdate()}>
</div>

<style>
    div {
        padding: 1rem;
        border: 1px solid black;
        border-radius: 5px;
    }
    .undef {
        margin-top: 0.25rem;
        border: 1px solid red;
        border-radius: 5px;
    }
</style>