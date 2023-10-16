<script>
    export let field;
    export let value;
    import { dataField } from "../../../../../lib/fields";
    export let newCard;

    function setUpdate(field) {
        newCard[field] = document.getElementById(field).value;
    }
</script>

<label for="{field}">
    {dataField[field].name}
    <select class="input" id="{field}" on:input={() => setUpdate(field)} value="{value}">
        <option value="{value}">{value}</option>
        {#each dataField[field].options as option}
            <option value="{option}">{option}</option>
        {/each}
    </select>
</label>

<style>
    label {
        display: block;
    }
</style>