<script lang="ts">
  import type { CreditCardType } from '$lib/types';
  import { user, cardList } from '$lib/stores';
  import Rewards from './components/Rewards.svelte';
  import CardStack from 'components/CardStack.svelte';
  import CreditCard from 'components/CreditCard.svelte';
 
  let wallet:Array<CreditCardType> = [];
  let tracking:Array<CreditCardType> = [];
  
  
  if ($user) {
    wallet = $cardList.filter((card) => card.id && $user && $user.wallet && $user.wallet.includes(card.id));
    tracking = $cardList.filter((card) => card.id && $user && $user.tracking && $user.tracking.includes(card.id));
  }
  
</script>

<svelte:head>
    <title>CreditCardDB | Account</title>
</svelte:head>

{#if $user}
<div id="account">
  <div id="wallet">
    <div class="title dark:text-white-warm">Your Wallet</div>
      {#if $user.wallet && $user.wallet.length > 0}
        <CardStack cards={wallet}></CardStack>
        <Rewards cards={wallet} title={"Your"}></Rewards>
      {:else}
        <CreditCard card={{
          name: "You do not have any cards in your wallet. To add a card, find a card you like, then select 'Add to Wallet', from the card's information page.",
          id: "null"
        }}></CreditCard>
      {/if}
    </div>
  <div id="tracklist">
    <div class="title dark:text-white-warm">Tracking</div>
      {#if $user.tracking && $user.tracking.length > 0}
        <CardStack cards={tracking}></CardStack>
        <Rewards cards={tracking} title={"Potential"} ></Rewards>
      {:else}
        <CreditCard card={{
          name: "You are not currently tracking any cards. To track a card, find a card you like, then select 'Track Card', from the card's information page. ",
          id: "null"
          }}></CreditCard>
      {/if}
    </div>
</div>
{:else}
<div>
  Please Log in to view account
</div>
{/if}

<style>
  .title {
      font-size: x-large;
      text-align: center;
      padding: 1rem;
    }
  @media (min-width: 768px) {
    .title {
      margin-bottom: 2rem;
    }
    #account {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    #wallet, #tracklist {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>