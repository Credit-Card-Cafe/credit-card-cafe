<script lang="js">
  export let data;
  import CardStack from '../../../components/CardStack.svelte';
  import { cardList } from '$lib/stores.js';
  import { getOneBank } from '$lib/firebase.js';
  import BankInfo from './components/BankInfo.svelte';

  let bank = {
    name: "Loading...",
    info: "Is this just real life, or is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, look up to the sky and see! I'm just a poor boy, I need no sympathy, because its easy come, easy go. Little high, little low. Anyway the wind blows - doesn't really matter to me, to me."
  }

  let list = [];
  getOneBank(data.slug).then((result) => {
     bank = result;
     list = $cardList.filter((card) => (
      Object.hasOwn(card, "bank_url")
      &&
      card.bank_url == bank.url
      )
      );
  });

</script>

<svelte:head>
    <title>CreditCardDB | {data.slug}</title>
</svelte:head>

<div id="bank">
  <CardStack cards={list}></CardStack>
  <BankInfo bank={bank}></BankInfo>
</div>

<style>
 div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 }
</style>