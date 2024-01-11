<script lang="ts">
    import { getSubmissionList, updateSubmission, getBankList} from "$lib/firebase";
    import { saveCardInfo, unavailableBank, newCard, cardList, admin} from "$lib/stores";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import {type Submission, type BankType, SubmissionType } from "$lib/types";

    let list:Array<Submission> = [];
    let bankList:Array<BankType> = [];
    let group:Array<string> = [];
    let display = "";

    onMount(() => {
        getBankList.then((data) => {
            bankList = data;
        });
        getSubmissionList.then((data) => {
            list = data;
        });
    });

    function removeSubs() {
        group.forEach((subId) => {
            let delSub = list.find((sub) => sub.id == subId)
            if (delSub) {
                updateSubmission({
                    display: false,
                    id: subId,
                    obj: delSub.obj,
                    time: delSub.time,
                    user: delSub.user,
                    type: delSub.type
                });
            }
        });
        list = list.filter((doc) => doc.id && !group.includes(doc.id))
        group = [];
    }

    //directs the user to additional page if submitting a card 
    function direct(submission: Submission){
        if ($admin) {
            if (submission.type == SubmissionType.Update) {
                if ($cardList.map((card) => card.id).includes(submission.obj.id)) { //card must exist
                    $newCard = submission.obj; // Will Be CreditCardType because SubmissionType.Update
                    if ($newCard && $newCard.image) {
                        $newCard.image = "pending"
                    }
                    goto(`/contribute/update/${submission.obj.id}`)
                } else {
                    display = "Selected update requires valid Card";
                }       
            } else if (submission.type == SubmissionType.AddCard) {
                if ("bank" in submission.obj && submission.obj.bank && bankList.map((bank) => bank.name).includes(submission.obj.bank)) { //bank must exist
                    $saveCardInfo = submission.obj;
                    goto(`/contribute/add-card`)
                } else {
                    display = "Selected card requires valid Bank";
                }
            } else if (submission.type == SubmissionType.AddBank) {
                $unavailableBank = submission.obj.name; // Will Be CreditCardType because SubmissionType.AddBank
                goto(`/contribute/add-bank`)
            }
            else {
                display = "Invalid Submission type. Please delete"
            }
        } else {
            display = "Please enable Admin mode"
        }
    }

</script>

<div id="submissions" class="pt-16">
    {#if list.length > 0}
    {#if display !=""}
    <div id="display">{display}</div>
    {/if}
    <table>
        <tr>
            {#if group.length > 0}
            <th on:click={() => removeSubs()}>delete</th>
            {:else}
            <th>select</th>
            {/if}
            <th>type</th>
            <th>id</th>
        </tr>
        {#each list as submission}  
        <tr>
            <td><input type="checkbox" bind:group value={submission.id}></td>
            <td on:click={() => direct(submission)}>{submission.type}</td>
            <td on:click={() => direct(submission)}>{submission.obj.id}</td>
        </tr>
        {/each}
    </table>
    {:else}
        <div id="nosubs">No current submissions!</div>
    {/if}
</div>

<style>
table > tr:nth-child(even) {
  background-color: rgb(240, 251, 255);
}
th,td {
    padding: 0.5rem;
    cursor: pointer;
}
#submissions {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
#display {
    border: 1px solid red;
    color: red;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
}
#nosubs {
    border: 1px solid black;
    border-radius: 5px;
    padding: 5rem;
}
</style>