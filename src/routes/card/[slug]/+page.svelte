<script lang="ts">
  import { type CreditCardType, CardNetwork, CardConsumer } from "$lib/types";
  import CreditCard from 'components/CreditCard.svelte';
  import { rgbToHex } from "$lib/functions";
  export let data;
  import { getOne } from '$lib/firebase';
  import { user, headerColor, oneCard, admin } from '$lib/stores';
  import CardInfo from './CardInfo.svelte';
  import { onDestroy } from "svelte";

  let card:CreditCardType = {
      name: "Loading...",
      bank: "Bank of Ben",
      network: CardNetwork.None,
      color: [253, 248, 244],
      id: "",
      bank_id: "",
      consumer: CardConsumer.Personal
  }

  let loaded = false;

  onDestroy(() => {
    headerColor.set(rgbToHex([253,248,244]));
  });

  async function getCard() {
    let error = false;
    if ($oneCard && data.slug == $oneCard.id) {
      loaded = true;
      if ($oneCard.color) {
        headerColor.set(`${rgbToHex($oneCard.color)} + "26"`);
      }
      card = $oneCard;
    } else {
      getOne(data.slug).then((result: CreditCardType) => {
        if (typeof result == "object") {
          $oneCard = result;
          card = result;
          loaded = true;
          if ($oneCard.color) {
            headerColor.set(`${rgbToHex($oneCard.color)} + "26"`);
          }
        } else {
          error = true;
        }
      })
    }
    if (error) {
      throw new Error();
    }
  };

</script>

<svelte:head>
    <title>CreditCardDB | {card.bank} - {card.name}</title>
</svelte:head>

<div class="p-4 md:pt-20 flex flex-col items-center group cardInfo">
  {#await getCard()}
    <CreditCard card={card} --color="{card.color}"></CreditCard>
    <CardInfo card={card}></CardInfo>
  {:then} 
    <CreditCard card={card} --color="{card.color}" showTrackCard={loaded}></CreditCard>
    <CardInfo card={card}></CardInfo>
    {#if $user}
      <a class="dark:text-white-warm p-3" href="/contribute/update/{card.id}">Update Information</a>
    {/if}
  {:catch} 
    Credit Card could not be located / does not exist.
  {/await}
  {#if $admin}
    <div class="fixed bottom-8 right-8 bg-white p-2 border h-1/2 overflow-auto">
        <pre class="float-right w-80 break-words">data.slug: {data.slug}<hr>$oneCard.id: {card.id}<hr>card: {JSON.stringify(card,null,1)}<hr>$oneCard: {JSON.stringify($oneCard,null,1)}</pre>
    </div>
  {/if}
</div>
