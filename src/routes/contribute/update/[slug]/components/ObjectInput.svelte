<script>
    export let field;
    export let object;
    import { dataField } from "../../../../../lib/fields";
    import RadioInput from "./RadioInput.svelte";
    import TextInput from "./TextInput.svelte";

    if (object == undefined) {
        object = {};
        for(let prop of Object.keys(dataField[field]["data"])) {
            object[prop] = "";
        }
    }

</script>

<div>
    {dataField[field].name}
    {#each Object.keys(dataField[field]["data"]) as data}
        {#if dataField[field]["data"][data].type == "text"}
            <TextInput field={data} value={object[data]} object={field}></TextInput>
        {:else if dataField[field]["data"][data].type == "radio"}
            <RadioInput field={data} value={object[data]} object={field}></RadioInput>
        {/if}
    {/each}
</div>
