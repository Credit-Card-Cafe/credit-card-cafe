<script lang="ts">
    import type {UpdateTypeField, UpdateTypeList} from "$lib/types"
    export let field: UpdateTypeField;
    export let list: UpdateTypeList;
    import { dataField } from "$lib/fields";
    import { newCard } from "$lib/stores";
    import TextInput from "./TextInput.svelte";

    if (list == undefined) {
        list = [];
    }

    function setField(event: any) {
        if (list && $newCard) {
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
    }

    function addField() {
        list = [...list as [], ""]; //reassigning value of list trigers the svelte {#key}
    }

    let render = list.length;
</script>

<div class="{list ? 'undef' : 'list'}">
    <div class="title">{dataField[field].name}</div>
    {#if list}
        {#key render}
            {#each list as item, i}
                <div class="element">
                    <TextInput field={i} value={item} on:add={setField}></TextInput>
                </div>
            {/each}
        {/key}
    {/if}
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