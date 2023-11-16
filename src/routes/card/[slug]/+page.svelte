<script lang="js">
  import CreditCard from '../../../components/CreditCard.svelte';
  export let data;
  import { getOne } from '$lib/firebase.js';
  import { user, headerColor, oneCard, admin } from '$lib/stores';
  import CardInfo from './CardInfo.svelte';

  let card = {
    name: "Loading...",
    bank: "Bank of Ben",
    network: "CreditCardDB",
    color: "253,248,244"
  }

  let loaded = false;

  async function getCard() {
    let error = false;
    if (Object.hasOwn($oneCard,"id") && data.slug == $oneCard.id) {
      loaded = true;
      headerColor.set("rgba(" + $oneCard.color + ",0.13)");
      card = $oneCard;
    } else {
      getOne(data.slug).then((result) => {
        if (typeof result == "object") {
          $oneCard = result;
          card = result;
          loaded = true;
          if ($oneCard.color) {
            headerColor.set("rgba(" + $oneCard.color + ",0.13)");
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

<div>
  {#await getCard()}
    Not Dope.
    <CreditCard card={card} --color="{card.color}"></CreditCard>
    <CardInfo card={card}></CardInfo>
  {:then} 
    Dope
    <CreditCard card={$oneCard} --color="{$oneCard.color}" showTrackCard={loaded}></CreditCard>
    <CardInfo card={$oneCard}></CardInfo>
    {#if $user}
      <a href="/contribute/update/{$oneCard.id}">Update Information</a>
    {/if}
  {:catch}
    Credit Card could not be located / does not exist.
  {/await}
  {#if $admin}
    <div class="a">
        <pre>data.slug: {data.slug}<br>$oneCard.id: {$oneCard.id}<br>card: {JSON.stringify(card,null,1)}<br>$oneCard: {JSON.stringify($oneCard,null,1)}</pre>
    </div>
{/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }
  @media (min-width: 768px) { 
    div {
      padding-top: 0;
    }
  }
  a {
        text-decoration: none;
        color: black;
        padding: .70rem;
        font-size: 1rem;
    }
     .a {
        position: fixed;
        top: 2.5rem;
        left:2rem;
        background: white;
        padding: 0.5rem;
        border: 1px solid black;
        height: 5rem;
        width: 20rem;
        margin-left:auto;
        margin-right:auto;
        text-align:right;
        overflow:hidden;
        white-space: nowrap;
    }
    pre {
      float: right;
    }
</style>