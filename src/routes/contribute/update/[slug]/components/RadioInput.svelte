<script>
    export let field;
    export let value;
    export let object = false;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";

    const defaultValue = value;
    var group = value;

    function setUpdate() {
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = group;
            if (group == defaultValue || (!defaultValue && group == "")) {
                delete $newCard[object][field];
                if (Object.keys($newCard[object]).length == 0)
                    delete $newCard[object];
            }
        } else {
            $newCard[field] = group;
            if (group == defaultValue || (!defaultValue && group == "")) {
                delete $newCard[field];
            }
        }        
    }
</script>

<div>
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

</style>