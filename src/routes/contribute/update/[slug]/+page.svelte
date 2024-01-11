<!-- Individual card update page-->
<script lang="ts">
    import Update from './Update.svelte';
    import { updateCard, getOne, addSubmission } from "$lib/firebase";
    export let data;
    import { goto } from '$app/navigation';
    import { user, newCard, oneCard, admin } from '$lib/stores';
    import { SubmissionType, type Submission } from '$lib/types';

    var updateAuthorization = true;

    function sendUpdate() {
      if ($newCard) {
        if ($user && $user.admin && $admin) {
          updateCard($newCard).then(() => {
              updateAuthorization = false; 
              $newCard = undefined;
              goto(`/card/${data.slug}`)
          });
        } else if ($user) {
          let submission:Submission = {
              obj: $newCard,
              type: SubmissionType.Update,
              user: $user.uid,
              time: Date.now(),
              display: true
          }
          if ($newCard.image && $newCard.image != "pending" && $newCard.image !== true && "image" in submission.obj) {
            submission.image = $newCard.image;
            submission.obj.image = "pending";
            $newCard.image = true;
          }
          addSubmission(submission).then(() => {
              updateAuthorization = false; 
              $newCard = undefined;
          });
        } else {
          window.alert("Must log in to update")
        }
      } else {
        window.alert("Nothing to Update!")
      }
    }
    
    var skipDatabaseRead = false;

    if ($oneCard && data.slug == $oneCard.id) {
      skipDatabaseRead = true;
    }
  </script>
  
<svelte:head>
    <title>CreditCardDB | Update Card</title>
</svelte:head>

  {#if $user}
    {#if skipDatabaseRead && $oneCard}
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