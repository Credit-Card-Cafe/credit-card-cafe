<script>
    export let field;
    export let value;
    export let object = false;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";

    const defaultValue = value;

    function setUpdate() {
        console.log(defaultValue, " => " ,value)
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = value;
            if (value == defaultValue || (!defaultValue && value == "")) {
                delete $newCard[object][field];
                if (Object.keys($newCard[object]).length == 0){
                    delete $newCard[object];
                }
            }
        } else {
            $newCard[field] = value;
            if (value == defaultValue || (!defaultValue && value == "")) {
                delete $newCard[field];
            }
        }
        
    }
</script>


<div>
    {#if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="text" bind:value on:input={() => setUpdate()}>
</div>
