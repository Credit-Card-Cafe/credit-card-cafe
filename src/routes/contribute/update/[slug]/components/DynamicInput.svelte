<script lang="ts">
    export let field: UpdateTypeField;
    export let object: UpdateTypeObject;
    import { dataField, lists} from "$lib/fields";
    import { newCard } from "$lib/stores";
    import SelectInput from "./SelectInput.svelte";
    import NumberInput from "./NumberInput.svelte";
    import type { UpdateTypeDynamic, UpdateTypeField, UpdateTypeObject } from "$lib/types";

    if (object == undefined) {
        object = {};
    }

    const dynamicObject:UpdateTypeDynamic = lists[dataField[field].list]
    const keys = Object.keys(dynamicObject)

    function checkObject() {
        if ($newCard) {
        let rmField = true;
            for (let prop of keys) {
                if (Object.hasOwn(object, prop)) {
                    if(!Object.hasOwn($newCard[field], prop)) {
                        $newCard[field][prop] = object[prop];
                    }
                    if($newCard[field][prop] != object[prop]){
                        rmField = false;
                    } 
                    if($newCard[field][prop] == null) {
                        delete $newCard[field][prop];
                    }
                } else if (Object.hasOwn($newCard[field], prop)) {
                    if ($newCard[field][prop] == "" || $newCard[field][prop] == null) {
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
    }

    var add = "";
    var addKey = {};
    function prepAdd(event: any) {
        add = event.detail;
    }
    function addField() {
        if (add != "") {
            object[add] = null;
        }
        addKey = {} //({} === {}) => false , triggers the key
    }

    function checkForValue(prop: string) {
        if ((object[prop] == "" || object[prop] == null) && $newCard && $newCard[field] && $newCard[field][prop]) {
            return $newCard[field][prop];
        } else {
            return object[prop];
        }
    }
</script>

<div class="dynamic">
    <div class="title">{dataField[field].name}</div>
    {#each Object.keys(object) as prop}
        <NumberInput field={prop} value={checkForValue(prop)} object={field.toString()} dynamicObject={dynamicObject} on:update={() => checkObject()}></NumberInput>
    {/each}
    {#key addKey}
        <SelectInput field={dataField[field].action} value={dataField[field].action} object={field.toString()} dynamicObject={dynamicObject} on:add={prepAdd}></SelectInput>
    {/key}
    <button on:click={() => addField()}>{dataField[field].action}</button>
</div>

<style>
    .dynamic {
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