<script lang="js">
    import SubmitDataForm from "./components/SubmitDataForm.svelte";
    import { user } from "../../lib/stores";
</script>

<svelte:head>
    <title>CreditCardDB | Contribute</title>
</svelte:head>
{#if $user}
<SubmitDataForm></SubmitDataForm>
{:else}
<div>Please sign in to access this page</div>
{/if}