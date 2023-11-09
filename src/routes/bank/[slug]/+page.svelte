<script lang="js">
  export let data;
  import CardStack from '../../../components/CardStack.svelte';
  import { cardList } from '$lib/stores.js';
  import { getOneBank } from '$lib/firebase.js';
  import BankInfo from './components/BankInfo.svelte';

  let bank = {
    name: "Loading...",
    info: "Loading..."
  }

  let list = [];
  getOneBank(data.slug).then((result) => {
     bank = result;
     list = $cardList.filter((card) => (
      Object.hasOwn(card, "bank_id")
      &&
      card.bank_id == bank.id
      )
      );
  });

</script>

<svelte:head>
    <title>CreditCardDB | {data.slug}</title>
</svelte:head>

<div id="bank">
  <CardStack cards={list} showTrackCard={true}></CardStack>
  <BankInfo bank={bank}></BankInfo>
</div>

<style>
 div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 }
</style>