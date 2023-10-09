<script lang="js">
    import { updateCard } from "../../../../lib/firebase";
	export let card;
    import { onMount } from "svelte";
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
        
        //updateCard(update, card.url).then();
    }
</script>

<div id="card"><label for="bank">Bank: </label>
    <input type="text" id="bank" value="{card.bank}" disabled>
    <label for="name">Credit Card Title</label>
    <input type="text" id="name" value="{card.name}" disabled>
    <label for="network">Credit Card Network</label>
    <select id="network" type="network" disabled>
        <option value={card.network} selected>{card.network}</option>
        <option value="Visa">Visa</option>
        <option value="MasterCard">MasterCard</option>
        <option value="American Express">American Express</option>
        <option value="Discover">Discover</option>
    </select>
    <label for="annual-fee">Annual Fee</label>
    <input type="text" id="annual-fee" value="{card.annual_fee}" disabled>
    <label for="ftf">Foreign Transaction Fee</label>
    <input type="text" id="ftf" value="{card.foreign_transaction_fee}" disabled>
</div>
<button on:click={sendUpdate()}>Submit Changes</button>

<style>
    #card {
        display: grid;
        grid-template-columns: auto auto;
    }
    label {
        text-align: right;
    }

</style>

