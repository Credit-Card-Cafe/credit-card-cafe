<!-- Individual card update page-->
<script lang="js">
    import UpdateCard from './UpdateCard.svelte';
    export let data;
  </script>
  
  
  {#if data.card}
    <UpdateCard card={data.card}></UpdateCard>
  {:else}
    <div>Credit Card not found. Would you like to create one?</div>
  {/if}