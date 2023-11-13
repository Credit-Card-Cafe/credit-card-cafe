<script>
    export let field;
    export let value = false;
    export let object = false;
    import { dataField } from "$lib/fields";
    import { newCard } from "$lib/stores";
    
    function setUpdate(file) {
        if (object) {
            if (!Object.hasOwn($newCard, object)) {
                $newCard[object] = {};
            }
            $newCard[object][field] = file;
        } else {
            $newCard[field] = file;
        }
    }
</script>


<div class={value === false ? 'undef' : ''}>
    {#if object} {dataField[object]["data"][field].name} {:else} {dataField[field].name} {/if}
    <input type="file" accept=".jpg, .jpeg, .png" on:change={(e) => setUpdate(e.target.files[0])}>
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