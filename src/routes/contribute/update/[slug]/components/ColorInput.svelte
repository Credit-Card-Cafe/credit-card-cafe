<script>
    export let field;
    export let value;
    export let object = false;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";
    import { hexToRgb, rgbToHex } from "../../../../../lib/functions";
    import { createEventDispatcher } from "svelte";

    const defaultValue = value;
    const dispatch = createEventDispatcher();
    const checkObject = () => dispatch('update')

    if (defaultValue == undefined) {
        value = "#FFEE2D6"
    } else {
        value = rgbToHex(value[0],value[1],value[2])
    }
    

    function setUpdate() {
        let color = hexToRgb(value);
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = value;
            checkObject();
        } else {
            $newCard[field] = color;
            if (JSON.stringify(color) == JSON.stringify(defaultValue) || (!defaultValue && color.length == 0)) {
                delete $newCard[field];
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