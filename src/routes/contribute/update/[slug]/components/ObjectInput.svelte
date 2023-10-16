<script>
  import { onMount } from "svelte";
    export let field;
    export let card;
    import { dataField } from "../../../../../lib/fields";
    export let newCard;

    let data = {}
    function setUpdate(val) {
        if (dataField[field]["data"][val].type == "radio") {
            document.getElementsByName(val).forEach((id) => {if(id.checked) data[val] = id.value});
        } else {
            data[val] = document.getElementById(val).value;
        }
        newCard[field] = data;
        console.log(newCard);
    }

    const dataKeys = Object.keys(dataField[field].data);

    onMount(()=>{
        dataKeys.forEach((val) => setUpdate(val));
    });

    function getValue(val) {
        if(card){
            return card[val];
        } else {
            return undefined;
        }
    }

</script>

<div>
    {dataField[field].name}
    {#each dataKeys as data}
        {#if dataField[field]["data"][data].type == "text"}
        <label for="{data}">
            {dataField[field]["data"][data].name}
            <input class="physical_card input" type="text" id="{data}" on:input={() => setUpdate(data)} value="{getValue(data)}">
        </label>
        {:else if dataField[field]["data"][data].type == "radio"}
        {dataField[field]["data"][data].name}
            {#each dataField[field]["data"][data].options as option}
                
                <label for="{data}{option}">{option}
                <input 
                    class="physical_card input" 
                    type="radio" 
                    name="{data}" 
                    id="{data}{option}" 
                    on:input={() => setUpdate(data)} 
                    value="{option}"
                    checked={option == getValue(data)}
                >
            </label>
            {/each}
        {/if}
        
    {/each}
</div>

<style>
    label {
        display: block;
    }
    label {
        text-indent: 30px;
    }
</style>