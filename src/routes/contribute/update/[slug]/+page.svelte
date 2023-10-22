<!-- Individual card update page-->
<script lang="js">
    import Update from './Update.svelte';
    import { updateCard, getOne } from "../../../../lib/firebase";
    export let data;
    import { user, newCard } from '../../../../lib/stores';

    console.log("Page.svelte load")

    var updateAuthorization = true;

    function sendUpdate() {
        updateCard($newCard, $newCard.id).then((data) => {
            updateAuthorization = false; 
            $newCard = {};
        });
    }
    
  </script>
  
<svelte:head>
    <title>CreditCardDB | Update Card</title>
</svelte:head>

  {#if $user}
    {#await getOne(data.slug)}
      <div>Loading...</div>

    {:then promisedCard} 
      {#if promisedCard != null}
        <Update card={promisedCard} updateAuthorization={updateAuthorization} on:submit={() => sendUpdate()}></Update>
      {:else}
        <div>Credit Card not found. Would you like to create one?</div>
      {/if}


    {/await}
  {:else}
    <div>Please log in to update a card</div>
  {/if}