<script lang="ts">
  import { convertJSONtoUser, getCardsFromIDList } from '$lib/functions';
  import { localUserData } from '$lib/stores';
  import type { CreditCardType } from '$lib/types';
  import Rewards from './components/Rewards.svelte';
  import CardStack from 'components/CardStack.svelte';
  import CreditCard from 'components/CreditCard.svelte';
    
  let wallet:CreditCardType[] = [];
  let tracking:CreditCardType[] = [];
  let localUser = convertJSONtoUser($localUserData)

  getCardsFromIDList(localUser.wallet).then(list => wallet = list)
  getCardsFromIDList(localUser.tracking).then(list => tracking = list)
</script>

<svelte:head>
    <title>CreditCardDB | Account</title>
</svelte:head>

<div class="md:flex md:flex-row md:justify-around md:flex-initial pt-16">
  <div class="md:flex md:flex-col md:items-center md:w-1/2">
    <div class="title md:mb-8 dark:text-white-warm">Your Wallet</div>
    {#if localUser.wallet && wallet.length > 0}
      <CardStack cards={wallet} allowCardFanning={true}></CardStack>
      <Rewards cards={wallet} localUser={localUser} title={"Your"}></Rewards>
    {:else}
      <CreditCard card={{
        name: "You do not have any cards in your wallet. To add a card, find a card you like, then select 'Add to Wallet', from the card's information page.",
        url: "null"
      }}></CreditCard>
    {/if}
  </div>
  <div class="md:flex md:flex-col md:items-center md:w-1/2">
    <div class="title md:mb-8 dark:text-white-warm">Tracking</div>
    {#if localUser.tracking && tracking.length > 0}
      <CardStack cards={tracking}></CardStack>
      <Rewards cards={tracking} localUser={localUser} title={"Potential"} ></Rewards>
    {:else}
      <CreditCard card={{
        name: "You are not currently tracking any cards. To track a card, find a card you like, then select 'Track Card', from the card's information page. ",
        url: "null"
        }}></CreditCard>
    {/if}
  </div>
</div>

  
<style>
  .title {
      @apply p-4 text-center text-xl;
  }
</style>