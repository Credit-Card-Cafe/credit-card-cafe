<!-- Individual card update page-->
<script lang="js">
    import Update from './Update.svelte';
    import { updateCard, getOne } from "../../../../lib/firebase";
    export let data;
    import { user, newCard } from '../../../../lib/stores';

    var updateAuthorization = true;

    let card = {
    name: "CreditCardDB",
    bank: "Bank of Ben",
    network: "Loading...",
    color: "0,0,0"
  }

    getOne(data.slug).then((result) => {
      card = result;
    });

    function sendUpdate() {
        updateCard($newCard, card.url).then((data) => {
            updateAuthorization = false; 
            $newCard = {};
            //document.getElementById("after").innerHTML = JSON.stringify(data);
        });
    }

    card.my_list = ["One","Two","Three","Four"]
  </script>
  
<svelte:head>
    <title>CreditCardDB | Update Card | {card.bank} - {card.name}</title>
</svelte:head>

  {#if $user}
    {#if card}
      <Update card={card} updateAuthorization={updateAuthorization} on:submit={() => sendUpdate()}></Update>
    {:else}
      <div>Credit Card not found. Would you like to create one?</div>
    {/if}
  {:else}
    <div>Please log in to update a card</div>
  {/if}