<script lang="ts">
  import { convertJSONtoUser, getCardsFromIDList, applyModifier } from '$lib/functions';
  import { localUserData } from '$lib/stores';
  import type { CreditCardType } from '$lib/types';
  import Rewards from './components/Rewards.svelte';
  import CardStack from 'components/CardStack.svelte';
  import CreditCard from 'components/CreditCard.svelte';
    
  let wallet:CreditCardType[] = [];
  let tracking:CreditCardType[] = [];
  let localUser = convertJSONtoUser($localUserData)

  getCardsFromIDList(localUser.wallet).then(list => wallet = list.map((card) => applyModifier(card, localUser)))
  getCardsFromIDList(localUser.tracking).then(list => tracking = list.map((card) => applyModifier(card, localUser)))

  const displayCard = {
      name: "Track cards to view rewards.",
      url: "null",
      bank: "CreditCardDB"
  } as unknown as CreditCardType
</script>

<svelte:head>
    <title>CreditCardDB | Account</title>
</svelte:head>


<div class="lg:flex lg:flex-col lg:flex-initial pt-16">
  <div class="lg:flex flex-1 flex-row justify-evenly lg:mx-20 lg:gap-20">
    <div class="title lg:mb-8 dark:text-white-warm lg:hidden">Your Wallet</div>
    {#if localUser.wallet && wallet.length > 0}
      <CardStack cards={wallet} allowCardFanning={true}></CardStack>
      <Rewards cards={wallet} localUser={localUser} title={"Your"}></Rewards>
    {:else}
      <div class="pb-16">
      <CreditCard card={displayCard}></CreditCard>
      </div>
    {/if}
  </div>
  <hr class="hidden md:block w-3/4 m-auto">
  <div class="lg:flex flex-1 flex-row justify-evenly lg:mx-20 gap-16 pt-16">
    <div class="title lg:mb-8 dark:text-white-warm lg:hidden">Tracking</div>
    {#if localUser.tracking && tracking.length > 0}
      <CardStack cards={tracking}></CardStack>
      <Rewards cards={tracking} localUser={localUser} title={"Potential"} ></Rewards>
    {:else}
      <CreditCard card={displayCard}></CreditCard>
    {/if}
  </div>
</div>

  
<style>
  .title {
      @apply p-4 text-center text-xl;
  }
    hr {
        border: 2px solid #d6c0a5;
    }
</style>
