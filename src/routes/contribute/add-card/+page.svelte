<script lang="js">
    import { user } from "../../../lib/stores";
    import { addCard } from "../../../lib/firebase";
    var submitted = true;
    var name = undefined;
    var bank = undefined;
    var network = undefined;
    function submit() {
        if ($user) {
            name = document.getElementById("name").value;
            bank = document.getElementById("bank").value;
            network = document.getElementById("network").value;
            if (name == undefined || bank == undefined || network == undefined) {
                console.log("Something went wrong...")
            } else {
                let id = bank + name;
                id = id.replace(/ /g, '').toLowerCase();
                addCard(name,bank,network,id).then(() => submitted = false);
            }
            
        }
        else {
            window.alert("Must be logged in to submit")
        }
    }
</script>

{#if submitted}
<div id="form">
    <div><label for="name">Credit Card Name</label><input id="name" name="name" type="text" required></div>
    <div><label for="bank">Bank</label><input id="bank" name="bank" type="text" required></div>
    <div><label for="network">Network</label>
        <select id="network" name="network" type="network" required>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
        </select>
    </div>
    <button on:click={submit}>Submit Card</button>
</div>
{:else}
<div>
    Thank you for submitting the {bank} {name} {#if bank != network} {network} {/if}. Your submission is in review. 
</div>
{/if}
