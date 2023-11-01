<script lang="js">
    import { user, admin, oneCard } from "../../../lib/stores";
    import { addCard } from "../../../lib/firebase";
    import { goto } from '$app/navigation';

    let submitted = true;
    let name = "";
    let bank = "";
    let network = "";
    let brand = "";
    let consumer = "";
    $: id = bank.concat(name).replace(/ /g, '').toLowerCase();
    $: searchTerms = [name, bank, network, brand].filter((term) => term!="");

    function submit() {
        if ($user) {
            if (name == "" || bank == "" || network == "" || searchTerms.includes("") || consumer == "") {
                console.log("Something went wrong...")
            } else {
                addCard(
                    name,
                    bank,
                    network,
                    searchTerms,
                    id
                ).then(() => {
                    submitted = false;
                    goto(`/contribute/update/${id}`)
                    $oneCard = {
                        name: name,
                        bank: bank,
                        network: network,
                        search_terms: searchTerms,
                        url: id
                    }
                });
            }
            
        }
        else {
            window.alert("Must be logged in to submit")
        }
    }
</script>

<svelte:head>
    <title>CreditCardDB | Add Card</title>
</svelte:head>

{#if submitted}
<div id="form">
    <div class={name == "" ? 'undef' : ''}>Credit Card Name <input bind:value={name} required></div>
    <div class={bank == "" ? 'undef' : ''}>Bank <input bind:value={bank} required></div>
    <div class={network == "" ? 'undef' : ''}>Network 
        <select bind:value={network} required>
            <option>Visa</option>
            <option>MasterCard</option>
            <option>American Express</option>
            <option>Discover</option>
        </select>
    </div>
    <div>Brand <input bind:value={brand}></div>
    <div class={consumer == "" ? 'undef' : ''}>Consumer 
        <select bind:value={consumer} required>
            <option>Personal</option>
            <option>Business</option>
            <option>Student</option>
        </select>
    </div>
    <button on:click={submit}>Submit Card</button>
</div>
    {#if admin}
        <pre>name: {name}<br>bank: {bank}<br>network: {network}<br>brand: {brand}<br>consumer: {consumer}<br>search_terms: {searchTerms}<br>url: {id}</pre>
    {/if}
{:else}
<div>
    Loading...
</div>
{/if}


<style>
    #form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #form > div {
        border-radius: 5px;
        padding: 2rem;
        margin-bottom: 0.75rem;
    }
    .undef {
        border: 1px solid red;
    }
</style>