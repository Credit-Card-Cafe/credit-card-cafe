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
    padding-top: 2rem;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
  }
  @media (min-width: 768px) {
    div {
      flex-direction: row;
    }
}
</style>