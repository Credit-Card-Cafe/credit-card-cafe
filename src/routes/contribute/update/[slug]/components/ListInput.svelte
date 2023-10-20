<script>
    export let field;
    export let list;
    import { dataField } from "../../../../../lib/fields";
    import TextInput from "./TextInput.svelte";

</script>

<div>
    {dataField[field].name}
    {#each list as item, i}
        <TextInput field={item}></TextInput>
    {/each}
</div>
