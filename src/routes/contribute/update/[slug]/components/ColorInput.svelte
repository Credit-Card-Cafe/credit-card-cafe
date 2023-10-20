<script>
    export let field;
    export let value;
    export let object = false;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";
    import { hexToRgb, rgbToHex } from "../../../../../lib/functions";

    const defaultValue = value;
    value = rgbToHex(value[0],value[1],value[2])
    console.log(defaultValue, " => ", value)

    function setUpdate() {
        let color = hexToRgb(value);
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = color;
            if (JSON.stringify(color) == JSON.stringify(defaultValue) || (!defaultValue && color.length == 0)) {
                delete $newCard[object][field];
                if (Object.keys($newCard[object]).length == 0)
                    delete $newCard[object];
            }
        } else {
            $newCard[field] = color;
            if (JSON.stringify(color) == JSON.stringify(defaultValue) || (!defaultValue && color.length == 0)) {
                delete $newCard[field];
            }
        }
        
    }
</script>


<div>
    {#if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="color" bind:value on:input={() => setUpdate()}>
</div>
