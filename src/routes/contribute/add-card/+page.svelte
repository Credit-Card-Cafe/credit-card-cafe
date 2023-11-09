<script lang="js">
    import { user, admin, oneCard, bankList, unavailableBank, saveCardInfo} from "$lib/stores";
    import { addCard, getBankList, addSubmission } from "$lib/firebase";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";

    onMount(() => {
        getBankList.then((list) => {$bankList = [...$bankList, ...list]})
    });

    let unsubmitted = true;
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

    if ($saveCardInfo) {
        (Object.hasOwn($saveCardInfo,"name") ? name = $saveCardInfo.name : name = "");
        (Object.hasOwn($saveCardInfo,"bank") ? bank = $saveCardInfo.bank : bank = "");
        (Object.hasOwn($saveCardInfo,"network") ? network = $saveCardInfo.network : network = "");
        (Object.hasOwn($saveCardInfo,"brand") ? brand = $saveCardInfo.brand : brand = "");
        (Object.hasOwn($saveCardInfo,"consumer") ? consumer = $saveCardInfo.consumer : consumer = "");
        tempCard = $saveCardInfo;
        $saveCardInfo = false;
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

    let validbank = false;

    $: if (bank != "") {
        if (!$bankList.find((b) => b.name == bank)) {
            validbank = false;
            $unavailableBank = bank;
        } else {
            validbank = true;
            tempCard["bank_url"] = $bankList.find((b) => b.name == bank).url;
        }
    } else {
        validbank = false;
    } 

    function genId() {
        let delWords = ["credit", "card", "union"]
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
        if ($user && $user.admin && $admin) {
            if (name == "" || bank == "" || network == "" || searchTerms.includes("") || consumer == "") {
                console.log("Something went wrong...")
            } else {
                addCard(tempCard).then(() => {
                    unsubmitted = false;
                    goto(`/contribute/update/${tempCard.url}`)
                    $oneCard = tempCard;
                });
            }
            
        } else if ($user) {
            if (name == "" || bank == "" || network == "" || searchTerms.includes("") || consumer == "") {
                console.log("Something went wrong...")
            } else {
                addSubmission(tempCard, "add-card").then(() => {
                    unsubmitted = false;
                    goto(`/contribute/update/${tempCard.url}`)
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

{#if unsubmitted}
<div id="form">
    <div class={name == "" ? 'undef' : ''}>Credit Card Name <input bind:value={name} required></div>
    <div class={bank == "" || !validbank ? 'undef' : ''}>
        {#if !validbank && bank !=""}
            <div class="err">Not in bank index. <a href="/contribute/add-bank" on:click={() => {$saveCardInfo = tempCard}}>Would you like to add it?</a></div>
        {/if}
        Bank <input bind:value={bank} required>
    </div>
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
    {#if $admin}
    <button disabled={name == "" || bank == "" || network == "" || consumer == "" || !validbank ? true : false} on:click={() => submit()}>Add Card</button>
    {:else}
    <button disabled={name == "" || bank == "" || network == "" || consumer == "" || !validbank ? true : false} on:click={() => submit()}>Submit Card</button>
    {/if}
</div>
    {#if $admin}
    <div class="a">
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
        transition: 0.25s all ease;
    }
    .undef {
        border: 1px solid red;
    }
    .a {
        position:fixed;
        top: 6rem;
        left: 2rem;
    }
    .err {
        margin-bottom: 1rem;
    }
</style>