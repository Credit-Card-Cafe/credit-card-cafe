<script lang="ts">
    export let field: UpdateTypeField;
    export let value: boolean = false;
    export let object: UpdateTypeObjectField = undefined;
    import { dataField } from "$lib/fields";
    import { newCard } from "$lib/stores";
    import type { UpdateTypeField, UpdateTypeObjectField } from "$lib/types";
    
    function setUpdate(e: any) {
        let file: File = e.target.files[0];
        if ($newCard) {
            if (object) {
                if (!$newCard.object) {
                    $newCard[object] = {};
                }
                $newCard[object][field] = file;
            } else {
                $newCard[field] = file;
            }
        }
    }
</script>


<div class={value === false ? 'undef' : ''}>
    {#if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="file" accept=".jpg, .jpeg, .png" on:change={setUpdate}>
</div>

<style>
    div {
        padding: 1rem;
        border: 1px solid black;
        border-radius: 5px;
    }
    .undef {
        margin-top: 0.25rem;
        border: 1px solid red;
        border-radius: 5px;
    }
</style>