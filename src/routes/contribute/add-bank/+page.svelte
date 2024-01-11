<script lang="ts">
    import { user, admin, bankList, unavailableBank} from "../../../lib/stores";
    import { addBank, addSubmission } from "../../../lib/firebase";
    import { goto } from '$app/navigation';
    import { SubmissionType, type BankType, type Submission } from "$lib/types";

    let submitted:boolean = true;
    let nicknames:Array<string> = [];
    let name:string = "";
    let tempBank: BankType = {
        name: name,
        id: ""
    };

    let defaultDirect = true;

    if ($unavailableBank) { // this is true when you are directed to this page while creating a card.
        name = $unavailableBank
        tempBank.name = name;
        tempBank.id = genId()
        defaultDirect = false;
    }
    function submit() {
        if ($user && $user.admin && $admin) {
            if (name == "") {
                console.log("Something went wrong...")
            } else {
                addBank(tempBank).then(() => {
                    $bankList.push(tempBank);
                    $unavailableBank = undefined;
                    submitted = false;
                    if (defaultDirect) {
                        goto(`/bank/${tempBank.id}`);
                    } else if ($admin) {
                        goto("/submissions")
                    } else {
                        goto("/contribute/add-card");
                    }
                });
            }    
        } else if ($user) {
            if (name == "") {
                console.log("Something went wrong...")
            } else {
                let submission: Submission = {
                    obj: tempBank,
                    display: true,
                    time: Date.now(),
                    type: SubmissionType.AddBank,
                    user: $user.uid
                }
                addSubmission(submission).then(() => {
                    $bankList.push(tempBank);
                    $unavailableBank = undefined;
                    submitted = false;
                    if (defaultDirect) {
                        goto(`/bank/${tempBank.id}`);
                    } else {
                        goto("/contribute/add-card");
                    }
                });
            }
        } else {
            window.alert("Must be logged in to submit")
        }
    }

    function genId() {
        let delWords = ["credit", "card", "union"]
        return name
        .trim()
        .split(" ")
        .filter((word) =>  !(delWords.includes(word.toLowerCase())))
        .join("-")
        .toLowerCase();
    }

    function setBank(){
        tempBank["name"] = name.trim();
        tempBank["id"] = genId();
    }

    function setNicknames(value:string, index:number) {
        if (value.length != 0) {
            nicknames[index] = value;
        } else {
            nicknames.splice(index, 1);
            render = nicknames.length;
        }
        tempBank.nicknames = nicknames.filter((n) => n.length != 0);
    }

    function addField() {
        nicknames = [...nicknames, ""];
        render = nicknames.length;
    }

    let render = nicknames.length;
</script>

<svelte:head>
    <title>CreditCardDB | Add Bank</title>
</svelte:head>

{#if submitted}
    <div class="flex flex-col items-center dark:text-white-warm">
        <div class="rounded-md p-8 mb-3">Couldn't find a bank? Add it here.</div>
        <div class={`${name == "" ? 'border-2 border-red-400' : ''} rounded-md p-8 mb-3`} >Bank <input class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" bind:value={name} on:input={() => setBank()} required></div>
        <div class={`${nicknames.length > 0 ? "bg-black/10" : ''} rounded-lg p-8 mb-3 flex flex-col items-center`}>
            {#if nicknames.length > 0}
            <div class="mb-3">Nicknames</div>
            {/if}
            {#key render}
                {#each nicknames as n, i}
                    <div class="flex flex-row items-center">
                        <input class="bg-slate-100 dark:border-green-500 border-2 outline-0 rounded m-2 dark:bg-neutral-700" type="text" bind:value={n} on:input={() => setNicknames(n, i)}>
                    </div>
                {/each}
            {/key}
            <button class="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all" on:click={() => addField()}>Add Nickname</button>
        </div>
        {#if $admin}
        <button class="my-3 bg-green-500 text-white font-bold py-2 px-4 rounded transition-all disabled:text-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 hover:bg-green-700" disabled={name == "" ? true : false} on:click={() => submit()}>Add Bank</button>
        {:else}
        <button class="my-3 bg-green-500 text-white font-bold py-2 px-4 rounded transition-all disabled:text-gray-300 disabled:bg-gray-200 disabled:hover:bg-gray-200 hover:bg-green-700" disabled={name == "" ? true : false} on:click={() => submit()}>Submit Bank</button>
        {/if}
    </div>
        {#if $admin}
        <div class="fixed top-24 left-8 text-white-warm">
            <pre>name: {name}</pre>
            <pre>nicknames: {JSON.stringify(nicknames)}</pre>
            <pre>{JSON.stringify(tempBank,null,1)}</pre>
        </div>
        {/if}
{:else}
<div>
    Loading...
</div>
{/if}
