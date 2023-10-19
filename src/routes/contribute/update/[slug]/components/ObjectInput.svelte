<script>
    export let field;
    export let object;
    import { dataField } from "../../../../../lib/fields";
    import TextInput from "./TextInput.svelte";
    import { newCard } from "../../../../../lib/stores";

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
        <!-- {:else if dataField[field]["data"][data].type == "radio"}
        {dataField[field]["data"][data].name}
            {#each dataField[field]["data"][data].options as option}
                
                <label for="{data}{option}">{option}
                <input 
                    class="physical_card input" 
                    type="radio" 
                    name="{data}" 
                    id="{data}{option}" 
                    on:input={() => setUpdate(data)} 
                    value="{option}"
                    checked={option == getValue(data)}
                >
            </label>
            {/each} -->
        {/if}
        
    {/each}
</div>
