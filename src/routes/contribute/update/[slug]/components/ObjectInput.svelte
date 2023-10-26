<script>
    export let field;
    export let object;
    import { dataField } from "../../../../../lib/fields";
    import RadioInput from "./RadioInput.svelte";
    import TextInput from "./TextInput.svelte";
    import { newCard } from "../../../../../lib/stores";

    const keys = Object.keys(dataField[field]["data"]);

    if (object == undefined) {
        object = {};
        for(let prop of keys) {
            object[prop] = "";
        }
    } 

    function checkObject() {
        /* A. Deletes the $newCard[field], unless:
            1. newCard[field] has a property that this object doesn't have, and that property is not blank.
            2. newCard[field] has a property that is different than the objects property, but this object does have.

           B. Adds add of this object's properties to newCard[field], if:
            1. newCard[field] does not have those properties, but this object does.
            2. newCard[field] has at least one property that this object doesn't have, or
            3. newCard[field] has at least one property that this object does have, but is modified.  
            4. object[prop] is not blank

           C. Removes fields from newCard[field], if:
            1. Object does not have this field, newCard[field] does have this field, and the field is blank.
            
        */
        let rmField = true;
        for (let prop of keys) {
            if (Object.hasOwn(object, prop) && object[prop] != "") { //B4
                if(!Object.hasOwn($newCard[field], prop)) { //B1
                    $newCard[field][prop] = object[prop];
                }
                if($newCard[field][prop] != object[prop]){ //A2, B3
                    rmField = false; 
                } 
            } else if (Object.hasOwn($newCard[field], prop)) { //A1, B2
                if ($newCard[field][prop] == "") { //C2
                    delete $newCard[field][prop];
                } else {
                    rmField = false; 
                }   
            }
        }
        if(rmField){
            delete $newCard[field];
        }
    }
</script>

<div class="object">
    <div class="title">{dataField[field].name}</div>
    {#each keys as data}
        {#if dataField[field]["data"][data].type == "text"}
            <TextInput field={data} value={object[data]} object={field} on:update={() => checkObject()}></TextInput>
        {:else if dataField[field]["data"][data].type == "radio"}
            <RadioInput field={data} value={object[data]} object={field} on:update={() => checkObject()}></RadioInput>
        {/if}
    {/each}
</div>

<style>
    .object {
        padding: 1rem;
        margin: 1rem 0;
        border: 1px solid black;
        border-radius: 5px;
    }
    .title {
        font-weight: 700;
        font-size: 1.5rem;
    }
</style>