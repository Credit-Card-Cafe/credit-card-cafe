<script>
    export let field;
    export let object;
    import { dataField, lists } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";
    import SelectInput from "./SelectInput.svelte";
    import NumberInput from "./NumberInput.svelte";

    if (object == undefined) {
        object = {};
    }

    const list = lists[dataField[field].list]
    const keys = Object.keys(list)

    function checkObject() {
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

    var add = "";
    function prepAdd(event) {
        add = event.detail;
    }
    function addField() {
        if (add != "") {
            object[add] = null;
        }
    }
</script>

<div>
    {dataField[field].name}
    {#each Object.keys(object) as prop}
        <NumberInput field={prop} value={object[prop]} object={field} list={list} on:update={() => checkObject()}></NumberInput>
    {/each}
    <SelectInput field={dataField[field].action} value={dataField[field].action} object={field} list={list} on:add={prepAdd}></SelectInput>
    <button on:click={() => addField()}>{dataField[field].action}</button>
</div>

<style>

</style>