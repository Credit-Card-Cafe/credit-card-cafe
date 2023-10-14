<script lang="js">
    import { updateCard } from "../../../../lib/firebase";
	export let card;
    import { onMount } from "svelte";
    import {dataField} from "./fields";
    import TextInput from "./components/TextInput.svelte";
    import SelectInput from "./components/SelectInput.svelte";
    import ObjectInput from "./components/ObjectInput.svelte";
    var updateAuthorization = true;
    var newCard = {};

    //after page load, modify the details of the value, if no information exists
    onMount(() => {
        const div = document.getElementById("card");
        const inputs = div.getElementsByTagName("input")
        for (const input of inputs) {
            if (
                
            input.value == "undefined") {
                input.value = "No available information";
            }
        }
        const options = document.getElementsByTagName("option");
        
        for (const option of options){
            if (option.value == "" && option.selected) {
                option.innerText = "No available information";
            }
        }
    });

    

    function sendUpdate() {
        console.log(newCard);
        updateCard(newCard, card.url).then((data) => {
            updateAuthorization = false; 
            //document.getElementById("after").innerHTML = JSON.stringify(data);
        });
    }

    const fields = Object.keys(dataField);
</script>

{#if updateAuthorization}
<div id="card">
    {#each fields as field}
        {#if dataField[field].type == "text"}
            <TextInput field={field} value={card[field]} newCard={newCard}></TextInput>
        {:else if dataField[field].type == "select"}
            <SelectInput field={field} value={card[field]} newCard={newCard}></SelectInput>
        {:else if dataField[field].type == "object"}
            <ObjectInput field={field} card={card[field]} newCard={newCard}></ObjectInput>
        {/if}
    {/each}
</div>
<button on:click|once|self={() => sendUpdate()}>Submit Changes</button>
{:else}
<div id="after">
    Thx.
</div>
{/if}



