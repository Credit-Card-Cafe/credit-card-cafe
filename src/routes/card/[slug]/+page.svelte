<script lang="ts">
  import { type CreditCardType, CardNetwork, CardConsumer } from "$lib/types";
  import CreditCard from 'components/CreditCard.svelte';
  export let data;
  import { getOne } from '$lib/firebase';
  import { oneCard, admin } from '$lib/stores';
  import CardInfo from './CardInfo.svelte';
  import CardActions from "./components/CardActions.svelte";
    import { onMount } from "svelte";
    import { sendPasswordResetEmail } from "firebase/auth";

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

  async function getCard() {
    let error = false;
    if ($oneCard && data.slug == $oneCard.id) {
      loaded = true;
      card = $oneCard;
    } else {
      getOne(data.slug).then((result: CreditCardType) => {
        if (typeof result == "object") {
          $oneCard = result;
          card = result;
          loaded = true;
        } else {
          error = true;
        }
      })
    }
    if (error) {
      throw new Error();
    }
  };

  let pos = 0;
  let scrolled = false;

  onMount(() => {
    document.addEventListener("scroll", (e) => {
      pos = window.scrollY;
      let card = document.getElementById("cardscroll")
      let info = document.getElementById("infoscroll") 
      const scrollAmount = 50;
      if (pos <= 0) {
        pos = 0
      }
      if (pos > scrollAmount) {
        scrolled = true
      } else {
        scrolled = false
      }
      if (pos <= scrollAmount && card && window.innerWidth >= 1024) {
        card.style.transform = `translate(-${(window.innerWidth / 4)*(pos/scrollAmount)}px,0)`
      } else if (pos > scrollAmount && card && window.innerWidth >= 1024) {
        card.style.transform = `translate(0,0)`
      } else if (card) {
        card.style.transform = `translate(-${(window.innerWidth)*(pos/scrollAmount)}px,0)`
      }
      if (info) {
        info.style.opacity = `${pos/scrollAmount}`
      }
    })
  })

</script>

<svelte:head>
    <title>CreditCardDB | {card.bank} - {card.name}</title>
    <meta name="description" content="{card.bank} - {card.name} on CreditCardDB">
    <meta name="image" content="{'images/' + card.id + '.png'}">
</svelte:head>

<div class={scrolled ? "pt-20 flex flex-col items-center lg:grid lg:grid-cols-2 lg:h-screen lg:snap-start lg:snap-always transition-all": "pt-20 flex flex-col items-center transition-all"}>
  {#await getCard()}
    <CreditCard card={card} --color="{card.color}"></CreditCard>
    <CardInfo card={card}></CardInfo>
  {:then} 
    <div id="cardscroll" class={scrolled? "pt-20 row-start-1 hidden lg:block" : "lg:pt-20 fixed"}><CreditCard card={card} --color="{card.color}" showTrackCard={loaded}></CreditCard></div>
    <div id="infoscroll" class={scrolled ? "pt-20 lg:px-10 lg:pt-0 col-start-2 row-span-2 h-full overflow-auto lg:border-b border-green-900" : "pt-20 h-full opacity-0 lg:invisible"}><CardInfo card={card}></CardInfo></div>
    <div class={scrolled ? "row-start-2" : "hidden"}><CardActions card={card}></CardActions></div>
  {:catch} 
    Credit Card could not be located / does not exist.
  {/await}
  {#if $admin}
    <div class="fixed bottom-8 right-8 bg-white p-2 border h-1/2 overflow-auto">
        <pre class="float-right w-80 break-words">data.slug: {data.slug}<hr>$oneCard.id: {card.id}<hr>card: {JSON.stringify(card,null,1)}<hr>$oneCard: {JSON.stringify($oneCard,null,1)}</pre>
    </div>
  {/if}
</div>
