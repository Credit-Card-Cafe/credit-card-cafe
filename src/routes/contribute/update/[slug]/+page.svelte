<!-- Individual card update page-->
<script lang="js">
    import Update from './Update.svelte';
    import { updateCard } from "../../../../lib/firebase";
    export let data;
    import { user } from '../../../../lib/stores';
    import { newCard } from '../../../../lib/stores';

    var updateAuthorization = true;

    function sendUpdate() {
        updateCard($newCard, data.card.url).then((data) => {
            updateAuthorization = false; 
            $newCard = {};
            //document.getElementById("after").innerHTML = JSON.stringify(data);
        });
    }

  </script>
  
<svelte:head>
    <title>CreditCardDB | Update Card | {data.card.bank} - {data.card.name}</title>
</svelte:head>

  {#if $user}
    {#if data.card}
      <Update card={data.card} updateAuthorization={updateAuthorization} on:submit={() => sendUpdate()}></Update>
    {:else}
      <div>Credit Card not found. Would you like to create one?</div>
    {/if}
  {:else}
    <div>Please log in to update a card</div>
  {/if}