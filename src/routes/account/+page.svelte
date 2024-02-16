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
<div class="md:flex md:flex-row md:justify-around md:flex-initial pt-16">
  <div class="md:flex md:flex-col md:items-center md:w-1/2">
    <div class="title md:mb-8 dark:text-white-warm">Your Wallet</div>
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
  <div class="md:flex md:flex-col md:items-center md:w-1/2">
    <div class="title md:mb-8 dark:text-white-warm">Tracking</div>
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
      @apply p-4 text-center text-xl;
  }
</style>