<script lang="ts">
    import { user, admin, oneCard, bankList, unavailableBank, saveCardInfo} from "$lib/stores";
    import {type CreditCardType, CardNetwork, CardConsumer, type Submission, SubmissionType} from "$lib/types";
    import { addCard, getBankList, addSubmission } from "$lib/firebase";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";

    onMount(() => {
        getBankList.then((list) => {$bankList = [...$bankList, ...list]})
    });

    let unsubmitted: boolean = true;
    let name: string = "";
    let bank: string = "";
    let network: CardNetwork | undefined = undefined;
    let brand: string = "";
    let consumer: CardConsumer | undefined = undefined;
    let tempCard: CreditCardType;
    let searchTerms: Array<string>;

    $: searchTerms = [name, bank, brand].filter((term) => term != "");
    $: tempCard = {
        name: name,
        bank: bank,
        network: network,
        consumer: consumer,
        brand: brand,
        id: genId(),
    } 

    if ($saveCardInfo) {
        ($saveCardInfo.name ? name = $saveCardInfo.name : name = "");
        ($saveCardInfo.bank ? bank = $saveCardInfo.bank : bank = "");
        ($saveCardInfo.network ? network = $saveCardInfo.network : network = CardNetwork.None);
        ($saveCardInfo.brand ? brand = $saveCardInfo.brand : brand = "");
        ($saveCardInfo.consumer ? consumer = $saveCardInfo.consumer : consumer = CardConsumer.Personal);
        tempCard = $saveCardInfo;
        $saveCardInfo = undefined;
    }


    $: if (searchTerms && searchTerms.length > 0) {
        tempCard["search_terms"] = searchTerms;
    } else if (searchTerms && searchTerms.length == 0 && tempCard && tempCard.search_terms) {
        delete tempCard["search_terms"];
    }
    $: if (brand != "") {
        tempCard["brand"] = brand;
    } else if (brand == "" && tempCard && tempCard.brand){
        delete tempCard["brand"];
    }

    let validbank = false;

    $: if (bank != "") {
        const validBank = $bankList.find((b) => b.name == bank)
        if (validBank) {
            validbank = true;
            tempCard["bank_id"] = validBank.id;
        } else {
            validbank = false;
            $unavailableBank = bank;
        }
    } else {
        validbank = false;
    } 

    function genId():string {
        let delWords = ["credit", "card", "union","for"]
        if (name) {
            let x = name.split(" ").filter((word) =>  
                !( delWords.includes(word.toLowerCase())
                || network && network && network.toLowerCase().includes(word.toLowerCase())
                || bank && bank.toLowerCase().includes(word.toLowerCase())
                || brand && brand.toLowerCase().includes(word.toLowerCase())
                )).join("-");
            if (x.length == 0) {x = "card"}
            if (brand && brand.trim().length > 0) {
                return brand.trim().concat(" ",x).replace(/ /g, '-').toLowerCase();
            } else if (bank && bank.trim().length > 0) {
                return bank.trim().concat(" ",x).replace(/ /g, '-').toLowerCase();
            }
        }
        return "";
    }

    function submit() {
        if ($user && $user.admin && $admin) {
            if (name == "" || bank == "" || network == undefined || searchTerms.includes("") || consumer == undefined) {
                console.log("Something went wrong...")
            } else {
                addCard(tempCard).then(() => {
                    unsubmitted = false;
                    goto(`/contribute/update/${tempCard.id}`)
                    $oneCard = tempCard;
                });
            }
            
        } else if ($user) {
            if (name == "" || bank == "" || network == undefined || searchTerms.includes("") || consumer == undefined) {
                console.log("Something went wrong...")
            } else {
                let submission: Submission = {
                    obj: tempCard,
                    display: true,
                    time: Date.now(),
                    type: SubmissionType.AddCard,
                    user: $user.uid
                }
                addSubmission(submission).then(() => {
                    unsubmitted = false;
                    goto(`/contribute/update/${tempCard.id}`)
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
<div class="flex flex-col items-center dark:text-white-warm">
    <div class={`${name == "" ? 'border-2 border-red-400' : ''} rounded-md p-8 mb-3`}>Credit Card Name <input class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value={name} required></div>
    <div class={`${bank == "" || !validbank ? 'border-2 border-red-400' : ''} rounded-md p-8 mb-3`}>
        {#if !validbank && bank !=""}
            <div class="mb-4">Not in bank index. <a href="/contribute/add-bank" class="mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all" on:click={() => {$saveCardInfo = tempCard}}>Would you like to add it?</a></div>
        {/if}
        Bank <input class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value={bank} required>
    </div>
    <div class={`${network == undefined ? 'border-2 border-red-400' : ''} rounded-md p-8 mb-3`}>Network 
        <select class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value={network} required>
            <option disabled value={undefined}>Select Network</option>
            <option value={CardNetwork.Visa}>Visa</option>
            <option value={CardNetwork.MasterCard}>MasterCard</option>
            <option value={CardNetwork.AmericanExpress}>American Express</option>
            <option value={CardNetwork.Discover}>Discover</option>
            <option value={CardNetwork.None}>None</option>
        </select>
    </div>
    <div class="p-8 mb-3">Brand <input class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value={brand}></div>
    <div class={`${consumer == undefined ? 'border-2 border-red-400' : ''} rounded-md p-8 mb-3`}>Consumer 
        <select class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value={consumer} required>
            <option disabled value={undefined}>Select Consumer</option>
            <option value={CardConsumer.Personal}>Personal</option>
            <option value={CardConsumer.Business}>Business</option>
            <option value={CardConsumer.Student}>Student</option>
        </select>
    </div>
    {#if $admin}
    <button class="bg-green-500 mb-3 text-white font-bold py-2 px-4 rounded transition-all disabled:text-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 hover:bg-green-700" disabled={name == "" || bank == "" || network == undefined || consumer == undefined || !validbank ? true : false} on:click={() => submit()}>Add Card</button>
    {:else}
    <button class="bg-green-500 mb-3 text-white font-bold py-2 px-4 rounded transition-all disabled:text-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 hover:bg-green-700" disabled={name == "" || bank == "" || network == undefined || consumer == undefined || !validbank ? true : false} on:click={() => submit()}>Submit Card</button>
    {/if}
</div>
    {#if $admin}
    <div class="fixed top-24 left-8">
        <pre>name: {name}<br>bank: {bank}<br>network: {network}<br>brand: {brand}<br>consumer: {consumer}<br>search_terms: {searchTerms}<br></pre>
        <pre>{JSON.stringify(tempCard,null,1)}</pre>
    </div>
    {/if}
    
{:else}
<div>
    Loading...
</div>
{/if}
