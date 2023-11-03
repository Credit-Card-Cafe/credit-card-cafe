<script lang="js">
  import { user, cardList } from '../../lib/stores';
  import { beforeUpdate } from 'svelte';
  import Rewards from './components/Rewards.svelte';
  import CardStack from './components/CardStack.svelte';
  let wallet = [];
  let tracking = [];

  beforeUpdate(() => {
    if ($user) {
      $user.wallet = ["americanexpresshiltonhonorsamericanexpressaspirecard","bankofbenbenbashbewards","ethanchanoggamercashrewards"]
      $user.tracking = ["americanexpressgold","chasesaphireprefered","keilben","twonew"]
      wallet = $cardList.filter((card) => $user && Object.hasOwn($user, "wallet") && $user.wallet.includes(card.url));
      tracking = $cardList.filter((card) => $user && Object.hasOwn($user, "tracking") && $user.tracking.includes(card.url));
    }
  });
  
</script>

<svelte:head>
    <title>CreditCardDB | Account</title>
</svelte:head>

{#if $user}
<div id="account">
  {#if wallet}
    <div id="wallet">
      <div class="title">Your Wallet</div>
      <CardStack cards={wallet}></CardStack>
      <Rewards cards={wallet} person={"Your"}></Rewards>
    </div>
  {/if}
  {#if tracking}
    <div id="tracklist">
      <div class="title">Tracking</div>
      <CardStack cards={tracking}></CardStack>
      <Rewards cards={tracking} person={"Potential"} ></Rewards>
    </div>
  {/if}
</div>
{:else}
<div>
  Please Log in to view account
</div>
{/if}

<style>
  .title {
    font-size: x-large;
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
</style>