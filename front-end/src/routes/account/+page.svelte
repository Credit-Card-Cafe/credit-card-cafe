<script lang="ts">
  import { convertJSONtoUser, getCardsFromIDList, applyModifier } from '$lib/functions';
  import { localUserData } from '$lib/stores';
  import type { ModifiedCardObject } from '$lib/types';
  import Rewards from './components/Rewards.svelte';
  import CardStack from 'global-components/CardStack.svelte';
  import CreditCard from 'global-components/CreditCard.svelte';
  
  let wallet:ModifiedCardObject[] = [];
  let tracking:ModifiedCardObject[] = [];
  let localUser = convertJSONtoUser($localUserData)

  getCardsFromIDList(localUser.wallet).then(list => wallet = list.map((card) => applyModifier(card, localUser)))
  getCardsFromIDList(localUser.tracking).then(list => tracking = list.map((card) => applyModifier(card, localUser)))

  const displayCard = {
      name: "Track cards to view rewards.",
      url: "null",
      bank: "CreditCardDB"
  } as unknown as ModifiedCardObject
</script>

<svelte:head>
    <title>Credit Card Cafe | Account</title>
</svelte:head>


<main class="lg:flex lg:flex-col lg:flex-initial">
  <section class="lg:flex flex-1 flex-row justify-evenly lg:mx-20 lg:gap-20">
    <div class="p-4 text-center text-xl lg:mb-8 dark:text-theme-text-white lg:hidden">Your Wallet</div>
    {#if localUser.wallet && wallet.length > 0}
      <CardStack cards={wallet} allowCardFanning={true}></CardStack>
      <Rewards cards={wallet} localUser={localUser} title={"Your"}></Rewards>
    {:else}
      <div class="pb-16">
      <CreditCard card={displayCard} --color="169,169,169"></CreditCard>
      </div>
    {/if}
  </section>
  <hr class="hidden md:block w-3/4 m-auto border-2 border-theme-text-white">
  <section class="lg:flex flex-1 flex-row justify-evenly lg:mx-20 gap-16 pt-16">
    <div class="p-4 text-center text-xl lg:mb-8 dark:theme-text-white lg:hidden">Tracking</div>
    {#if localUser.tracking && tracking.length > 0}
      <CardStack cards={tracking}></CardStack>
      <Rewards cards={tracking} localUser={localUser} title={"Potential"} ></Rewards>
    {:else}
      <CreditCard card={displayCard} --color="169,169,169"></CreditCard>
    {/if}
  </section>
</main>
