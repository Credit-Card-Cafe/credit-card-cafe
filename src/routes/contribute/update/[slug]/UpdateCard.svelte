<script lang="js">
    import { updateCard } from "../../../../lib/firebase";
	export let card;
    import { onMount } from "svelte";

    var updateAuthorization = true;

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

    function setUpdate() {
        card.bank = document.getElementById("bank").value;
        card.name = document.getElementById("name").value;
        card.network = document.getElementById("network").value;
        card.annual_fee = document.getElementById("annual_fee").value;
        card.foreign_transaction_fee = document.getElementById("ftf").value;
    }
    function sendUpdate() {
        updateCard(card, card.url).then((data) => {
            updateAuthorization = false; 
            document.getElementById("after").innerHTML = JSON.stringify(data);
        });
    }
</script>

{#if updateAuthorization}
<div id="card">
    <label for="bank">Bank: <input class="input" type="text" id="bank" on:input={() => setUpdate()} value="{card.bank}" disabled></label>
    
    <label for="name">Credit Card Title: <input class="input" type="text" id="name" on:input={() => setUpdate()} value="{card.name}" disabled></label>
    
    <label for="network">Credit Card Network:
        <select id="network" class="input" on:input={() => setUpdate()} disabled>
            <option value={card.network} selected>{card.network}</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
        </select>
    </label>

    <label for="annual_fee">Annual Fee: <input class="input" type="text" id="annual_fee" on:input={() => setUpdate()} value="{card.annual_fee}" disabled></label>
    
    <label for="ftf">Foreign Transaction Fee: <input class="input" type="text" on:input={() => setUpdate()} id="ftf" value="{card.foreign_transaction_fee}" disabled></label>
    
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

