<script lang="ts">
  import { convertJSONtoUser, getCardsFromIDList, applyModifier } from '$lib/functions';
  import { localUserData } from '$lib/stores';
  import type { ModifiedCardObject } from '$lib/types';
  import Rewards from './components/Rewards.svelte';
  import CardStack from 'global-components/CardStack.svelte';
  import DefaultCreditCard from 'global-components/DefaultCreditCard.svelte';
  
  let wallet:ModifiedCardObject[] = [];
  let tracking:ModifiedCardObject[] = [];
  let localUser = convertJSONtoUser($localUserData)


  getCardsFromIDList(localUser.wallet).then(list => wallet = list.map((card) => applyModifier(card, localUser)))
  getCardsFromIDList(localUser.tracking).then(list => tracking = list.map((card) => applyModifier(card, localUser)))


  
  let selectionSwitch:"wallet" | "table" | "tracking" = "wallet";
  
</script>

<svelte:head>
    <title>Credit Card Cafe | Account</title>
</svelte:head>


<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col items-center gap-y-6">
  {#if localUser.wallet && wallet.length > 0 || localUser.tracking && tracking.length > 0}
    <div class="rounded-lg bg-theme-lightgray dark:bg-theme-darkgray w-full lg:w-fit flex flex-row justify-center gap-x-6 p-2">
      <button on:click={() => selectionSwitch="wallet"}   class="rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl {selectionSwitch == "wallet"   ? "bg-theme-blue text-theme-white hover:bg-theme-blue-hov" : "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov"}">{selectionSwitch ? "Viewing Wallet" : "View Wallet"}</button>
      <button on:click={() => selectionSwitch="tracking"} class="rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl {selectionSwitch == "tracking" ? "bg-theme-blue text-theme-white hover:bg-theme-blue-hov" : "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov"}">{selectionSwitch ? "Viewing Tracked Cards" : "View Tracked Cards"}</button>
      <a href="/table"                                    class="rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl {selectionSwitch == "table"    ? "bg-theme-blue text-theme-white hover:bg-theme-blue-hov" : "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov"}">{selectionSwitch ? "View Table" : "Viewing Table"}</a>
    </div>
    <section class="flex flex-col-reverse lg:flex-row justify-evenly gap-20 lg:px-20 w-full">
      {#if selectionSwitch == "wallet"}
        {#if localUser.wallet && wallet.length > 0}
          <CardStack cards={wallet} allowCardFanning={true}></CardStack>
          <Rewards cards={wallet} localUser={localUser}></Rewards>
        {:else}
          <DefaultCreditCard></DefaultCreditCard>
          <Rewards cards={[]} localUser={localUser}></Rewards>
        {/if}
      {:else if selectionSwitch == "tracking"}
        {#if localUser.tracking && tracking.length > 0}
          <CardStack cards={tracking}></CardStack>
          <Rewards cards={tracking} localUser={localUser}></Rewards>
        {:else}
          <DefaultCreditCard></DefaultCreditCard>
          <Rewards cards={[]} localUser={localUser}></Rewards>
        {/if}
      {/if}
    </section>
  {:else}
  <section class="flex flex-col gap-y-6 lg:gap-y-8 px-6 lg:ml-16 lg:w-3/4">
  <h1 class="text-4xl lg:text-6xl font-bold text-theme-green text-center lg:text-left">Your wallet is empty, and you haven't started tracking cards!</h1>
    <h2 class="text-2xl lg:text-4xl font-semibold">Add cards that you own to your Wallet to begin comparing features and rewards</h2>
    <h2 class="text-2xl lg:text-4xl font-semibold">Experience our "Tracking" feature, to find which card is right for your wallet</h2>
    <a href="/s/get-started/" class="lg:mt-6 bg-theme-blue hover:bg-theme-blue-hov py-4 px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg text-xl font-semibold items-center">Try it out now!</a>
  </section>
  {/if}
</main>
