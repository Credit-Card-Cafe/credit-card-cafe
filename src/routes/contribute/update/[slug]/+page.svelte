<!-- Individual card update page-->
<script lang="js">
    import Update from './Update.svelte';
    import { updateCard, getOne, addSubmission } from "$lib/firebase";
    export let data;
    import { goto } from '$app/navigation';
    import { user, newCard, oneCard, admin } from '$lib/stores';

    var updateAuthorization = true;

    function sendUpdate() {
      if ($user && $user.admin && $admin) {
        updateCard($newCard, $newCard.id).then((e) => {
            updateAuthorization = false; 
            $newCard = {};
            goto(`/card/${data.slug}`)
        });
      } else if ($user) {
        addSubmission({card: $newCard, id: $newCard.id}, "update").then((data) => {
            updateAuthorization = false; 
            $newCard = {};

        });
      } else {
        window.alert("Must log in to update")
      }
    }
    
    var skipDatabaseRead = false;

    if (data.slug == $oneCard.id) {
      skipDatabaseRead = true;
    }
  </script>
  
<svelte:head>
    <title>CreditCardDB | Update Card</title>
</svelte:head>

  {#if $user}
    {#if skipDatabaseRead}
      <Update card={$oneCard} updateAuthorization={updateAuthorization} on:submit={() => sendUpdate()}></Update>
    {:else}
      {#await getOne(data.slug)}
        <div>Loading...</div>

      {:then promisedCard} 
        {#if promisedCard != null}
          <Update card={promisedCard} updateAuthorization={updateAuthorization} on:submit={() => sendUpdate()}></Update>
        {:else}
          <div>Credit Card not found. Would you like to create one?</div>
        {/if}


      {/await}
    {/if}
  {:else}
    <div>Please log in to update a card</div>
  {/if}