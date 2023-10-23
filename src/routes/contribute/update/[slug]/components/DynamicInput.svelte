<script>
    export let field;
    export let object;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";

    if (object == undefined) {
        object = {};
        for(let prop of Object.keys(dataField[field]["data"])) {
            object[prop] = "";
        }
    }

</script>

<div>
    {#each Object.keys(object) as prop}
        
    {/each}
</div>

<style>

</style>