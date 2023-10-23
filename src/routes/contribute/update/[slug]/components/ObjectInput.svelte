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
            1. newCard[field] does not have those properties.
            2. newCard[field] has at least one property that this object doesn't have, or
            3. newCard[field] has at least one propert that this object does have, but is modified.  

           C. Removes fields from newCard[field], if:
            1. Object does not have this field, and the field is blank.
            
        */
        let rmField = true;
        for (let prop of keys) {
            if (Object.hasOwn(object, prop)) {
                if(!Object.hasOwn($newCard[field], prop)) { //B1
                    $newCard[field][prop] = object[prop];
                }
                if($newCard[field][prop] != object[prop]){ //A2
                    rmField = false; //B3
                } 
            } else if (Object.hasOwn($newCard[field], prop)) { //A1 
                if ($newCard[field][prop] == "") { //C2
                    delete $newCard[field][prop];
                } else {
                    rmField = false; //B2
                }
                
            } 
            
        }
        if(rmField){
            delete $newCard[field];
        }
    }
</script>

<div>
    {dataField[field].name}
    {#each keys as data}
        {#if dataField[field]["data"][data].type == "text"}
            <TextInput field={data} value={object[data]} object={field} on:update={() => checkObject()}></TextInput>
        {:else if dataField[field]["data"][data].type == "radio"}
            <RadioInput field={data} value={object[data]} object={field} on:update={() => checkObject()}></RadioInput>
        {/if}
    {/each}
</div>
