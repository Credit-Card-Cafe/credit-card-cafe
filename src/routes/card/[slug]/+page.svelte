<script lang="ts">
  import CreditCard from 'components/CreditCard.svelte';
  export let data;
  import CardInfo from './CardInfo.svelte';
  import CardActions from "./components/CardActions.svelte";
  import { onMount } from "svelte";
  import { localUserData } from '$lib/stores';
  import { convertJSONtoUser, applyModifier, injectBankToCard, injectBrandToCard } from '$lib/functions';

  let card = data.card;
  let localUser = convertJSONtoUser($localUserData)
  
  if (card) {
    card = applyModifier(card, localUser)
    injectBankToCard(card).then((cardWithBank) => {
      card = cardWithBank
    })
    if (card.brand_id) {
      injectBrandToCard(card).then((cardWithBrand) => {
        card = cardWithBrand
      })
    }
  }

  let pos = 0;
  let scrolled = true;

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
    {#if card}
    <title>CreditCardDB | {card.bank} - {card.name}</title>
    <meta name="description" content="{card.bank} - {card.name} on CreditCardDB">
    <meta name="image" content="{'images/' + card.id + '.png'}">
    {/if}
</svelte:head>

{#if card}
<div class={scrolled ? "pt-20 flex flex-col items-center lg:grid lg:grid-cols-2 lg:h-screen lg:snap-start lg:snap-proximity overflow-auto transition-all": "pt-20 flex flex-col items-center transition-all"}>
    <div id="cardscroll" class={scrolled? "pt-20 row-start-1 hidden lg:block" : "lg:pt-20 fixed"}>
      <CreditCard card={card} --color="{card.color}" showTrackCard={scrolled} scale={110}></CreditCard></div>
    <div id="infoscroll" class={scrolled ? "pt-20 lg:px-10 lg:pt-0 col-start-2 row-span-2 h-full overflow-auto lg:border-b border-green-900" : "pt-20 h-full opacity-0 lg:invisible"}>
      <CardInfo card={card}></CardInfo></div>
    <div class={scrolled ? "row-start-2" : "hidden"}>
      <CardActions card={card}></CardActions></div>
</div>
{/if}
