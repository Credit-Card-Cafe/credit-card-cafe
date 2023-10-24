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


<div>
    {#if list} {list[field]} purchases {:else if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="text" bind:value on:input={() => setUpdate()}>
</div>
