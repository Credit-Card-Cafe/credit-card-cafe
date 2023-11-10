<script>
    import { getSubmissionList } from "../../lib/firebase";
    import { oneCard, saveCardInfo, unavailableBank, newCard } from "../../lib/stores";
    import { goto } from '$app/navigation';

    let list = []

    getSubmissionList.then((data) => {
        list = data.filter((e) => e.type!="default");
    })

    function direct(submission){
        if (submission.type == "update") {
            $newCard = submission.obj.card;
            goto(`/contribute/update/${submission.obj.id}`)
        } else if (submission.type == "add-bank") {
            $unavailableBank = submission.obj.name;
            goto(`/contribute/add-bank`)
        } else if (submission.type == "add-card") {
            $saveCardInfo = submission.obj;
            goto(`/contribute/add-card`)
        }
    }
</script>

<div>
    <table>
        <tr><th>type</th><th>id</th></tr>
        {#each list as submission}  
        <tr on:click={() => direct(submission)}>
            <td>{submission.type}</td>
            <td>{submission.obj.id}</td>
        </tr>
        {/each}
    </table>
</div>

<style>
table > tr:nth-child(even) {
  background-color: rgb(240, 251, 255);
}
th,td {
    padding: 0.5rem;
    cursor: pointer;
}
div {
    display: flex;
    justify-content: center;
}
</style>