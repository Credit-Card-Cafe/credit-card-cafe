<script>
    import { getSubmissionList, updateSubmission, getBankList} from "$lib/firebase";
    import { saveCardInfo, unavailableBank, newCard, cardList, admin} from "$lib/stores";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";

    let list = [];
    let bankList = [];
    let group = [];
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
        group.forEach((id) => {
            updateSubmission({display: false}, id);
        });
        list = list.filter((doc) => !group.includes(doc.id))
        group = [];
    }

    function direct(submission){
        if ($admin) {
            if (submission.type == "update") {
                if ($cardList.map((card) => card.id).includes(submission.obj.id)) {
                    $newCard = submission.obj.card;
                    goto(`/contribute/update/${submission.obj.id}`)
                } else {
                    display = "Selected update requires valid Card";
                }       
            } else if (submission.type == "add-bank") {
                $unavailableBank = submission.obj.name;
                goto(`/contribute/add-bank`)
            } else if (submission.type == "add-card") {
                if (bankList.map((bank) => bank.name).includes(submission.obj.bank)) {
                    $saveCardInfo = submission.obj;
                    goto(`/contribute/add-card`)
                } else {
                    display = "Selected card requires valid Bank";
                }
            }
        } else {
            display = "Please enable Admin mode"
        }
    }

</script>

<div id="submissions">
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
            <td on:click={() => direct(submission.data())}>{submission.data().type}</td>
            <td on:click={() => direct(submission.data())}>{submission.data().obj.id}</td>
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