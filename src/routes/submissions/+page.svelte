<script>
    import { getSubmissionList } from "../../lib/firebase";

    let list = []

    getSubmissionList.then((data) => {
        list = data;
    })
</script>

<table>
    <tr><th>type</th><th>id</th></tr>
    {#each list as submission}
    <tr>{submission.type}</tr>
    <tr>{submission.id}</tr>
    {/each}
</table>

<style>

</style>