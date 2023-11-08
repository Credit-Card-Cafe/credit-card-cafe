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
    $: searchTerms = [name, bank, brand].filter((term) => term!="");
    $: tempCard = {
        name: name,
        bank: bank,
        network: network,
        consumer: consumer,
        brand: brand,
        url: genId(),
    } 
    $: if (searchTerms && searchTerms.length > 0) {
        tempCard["search_terms"] = searchTerms;
    } else if (searchTerms && searchTerms.length == 0 && tempCard && Object.hasOwn(tempCard,"search_terms")) {
        delete tempCard["search_terms"];
    }
    $: if (brand != "") {
        tempCard["brand"] = brand;
    } else if (brand == "" && tempCard && Object.hasOwn(tempCard,"brand")){
        delete tempCard["brand"];
    }
    $: if (network == "American Express") {
        searchTerms.push("Amex")
    } else if (searchTerms.includes("Amex")) {
        searchTerms.splice(searchTerms.findIndex((term) => term == "Amex"),1);
    }

    function genId() {
        let delWords = ["credit", "card"]
        let x = name.split(" ").filter((word) =>  !(
                delWords.includes(word.toLowerCase())
                ||
                network.toLowerCase().includes(word.toLowerCase())
                ||
                bank.toLowerCase().includes(word.toLowerCase())
                ||
                brand.toLowerCase().includes(word.toLowerCase())
            )).join("-");
        if (x.length == 0) {x = "card"}
        if (brand.trim().length > 0) {
            return brand.trim().concat(" ",x).replace(/ /g, '-').toLowerCase();
        } else if (bank.trim().length > 0) {
            return bank.trim().concat(" ",x).replace(/ /g, '-').toLowerCase();
        }
    }

    function submit() {
        if ($user) {
            if (name == "" || bank == "" || network == "" || searchTerms.includes("") || consumer == "") {
                console.log("Something went wrong...")
            } else {
                addCard(tempCard).then(() => {
                    submitted = false;
                    goto(`/contribute/update/${tempcard.url}`)
                    $oneCard = tempCard;
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
    {#if $admin}
    <div>
        <pre>name: {name}<br>bank: {bank}<br>network: {network}<br>brand: {brand}<br>consumer: {consumer}<br>search_terms: {searchTerms}<br></pre>
        <pre>{JSON.stringify(tempCard,null,1)}</pre>
    </div>
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