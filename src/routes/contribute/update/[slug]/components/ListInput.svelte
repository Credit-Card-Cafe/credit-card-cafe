<script>
    export let field;
    export let list;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";
    import TextInput from "./TextInput.svelte";

    if (list == undefined) {
        list = [];
    }

    function setField(event) {
        if (event.detail.value != "") {
            list[event.detail.index] = event.detail.value;
        } else {
            list.splice(event.detail.index, 1);
            render = list.length;
        }
        $newCard[field] = list.filter((i) => typeof i === "string" && i != "");
        if(list.length == 0 || $newCard[field].length == 0) {
            delete $newCard[field];
        }
    }

    function addField() {
        list = [...list, ""];
    }

    let render = list.length;
</script>

<div class="{list == {} ? 'undef' : 'list'}">
    <div class="title">{dataField[field].name}</div>
    {#key render}
        {#each list as item, i}
            <div class="element">
                <TextInput field={i} value={item} on:add={setField}></TextInput>
            </div>
        {/each}
    {/key}
    <button on:click={() => addField()}>{dataField[field].action}</button>
</div>

<style>
    .element {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .list {
        padding: 1rem;
        margin: 1rem 0;
        border: 1px solid black;
        border-radius: 5px;
    }
    .title {
        font-weight: 700;
        font-size: 1.5rem;
    }
    .undef {
        padding: 1rem;
        margin: 1rem 0;
        border: 1px solid red;
        border-radius: 5px;
    }
</style>