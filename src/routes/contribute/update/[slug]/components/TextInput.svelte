<script>
    export let field;
    export let value;
    import { dataField } from "../../../../../lib/fields";
    import { newCard } from "../../../../../lib/stores";

    const defaultValue = value;

    function setUpdate() {
        $newCard[field] = value;
        if (value == defaultValue || (!defaultValue && value == "")) {
            delete $newCard[field];
        }
    }
</script>


<div>
    {dataField[field].name}
    <input type="text" bind:value on:input={() => setUpdate()}>
</div>

<style>

</style>