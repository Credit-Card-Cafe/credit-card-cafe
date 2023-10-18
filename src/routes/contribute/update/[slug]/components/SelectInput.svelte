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
    <select bind:value on:change={() => setUpdate()} >
        <option disabled selected>{value}</option>
        {#each dataField[field].options as option}
            <option>{option}</option>
        {/each}
    </select>
</div>

<style>

</style>