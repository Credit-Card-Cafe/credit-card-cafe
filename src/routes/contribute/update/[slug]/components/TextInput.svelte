<script>
    export let field;
    export let value;
    import { dataField } from "../../../../../lib/fields";
    export let newCard;

    function setUpdate(val) {
        newCard[val] = document.getElementById(val).value;
    }
</script>


<label for="{field}">
    {dataField[field].name}
    <input class="input" type="text" id="{field}" on:input={() => setUpdate(field)} value="{value}">
</label>

<style>
    label {
        display: block;
    }
</style>