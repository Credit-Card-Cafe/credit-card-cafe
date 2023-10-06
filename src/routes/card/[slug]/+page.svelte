<script lang="js">
  import CreditCard from '../../../components/CreditCard.svelte';
  export let data;
</script>


{#if data.card}
  <CreditCard card={data.card}></CreditCard>
{:else}
  <div>Credit Card not found</div>
{/if}