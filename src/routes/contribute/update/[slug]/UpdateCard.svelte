<script lang="js">
    import { updateCard } from "../../../../lib/firebase";
	export let card;
    import { onMount } from "svelte";
    import {dataField} from "./fields";

    var updateAuthorization = true;
    var updateList = [];
    var newCard = {};
    //after mount, modify the details of the value, if no information exists
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

    function setUpdate(field) {
        if (!updateList.includes(field)) {
            updateList.push(field);
        }
        newCard[field] = document.getElementById(field).value;
    }

    function sendUpdate() {
            updateCard(newCard, card.url).then((data) => {
                updateAuthorization = false; 
                //document.getElementById("after").innerHTML = JSON.stringify(data);
                console.log(newCard);
                console.log(card);
            });
            
        
    }
</script>

{#if updateAuthorization}
<div id="card">
    <label for="{dataField.bank}">
        Bank: 
        <input class="input" type="text" id="{dataField.bank}" on:input={() => setUpdate(dataField.bank)} value="{card.bank}">
    </label>
    
    <label for="{dataField.name}">
        Credit Card Title: 
        <input class="input" type="text" id="{dataField.name}" on:input={() => setUpdate(dataField.name)} value="{card.name}">
    </label>
    
    <label for="{dataField.network}">Credit Card Network:
        <select id="{dataField.network}" class="input" on:input={() => setUpdate(dataField.network)}>
            <option value={card.network} selected>{card.network}</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
        </select>
    </label>

    <label for="{dataField.af}">
        Annual Fee: 
        <input class="input" type="text" id="{dataField.af}" on:input={() => setUpdate(dataField.af)} value="{card.annual_fee}">
    </label>
    
    <label for="{dataField.ftf}">
        Foreign Transaction Fee: 
        <input class="input" type="text" id="{dataField.ftf}" on:input={() => setUpdate(dataField.ftf)} value="{card.foreign_transaction_fee}">
    </label>
    
</div>
<button on:click|once|self={() => sendUpdate()}>Submit Changes</button>
{:else}
<div id="after">
    Thx.
</div>
{/if}

<style>
label {
    display: block;
}
</style>

