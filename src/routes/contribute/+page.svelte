<script lang="ts">
    import SubmitDataForm from "./components/SubmitDataForm.svelte";
    import { user } from "../../lib/stores";
</script>

<svelte:head>
    <title>CreditCardDB | Contribute</title>
</svelte:head>

<div class="pt-16">
{#if $user}
<SubmitDataForm></SubmitDataForm>
{:else}
<div>Please sign in to access this page</div>
{/if}
</div>