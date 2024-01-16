<script lang="ts">
  export let data;
  import CardStack from '../../../components/CardStack.svelte';
  import { cardList } from '$lib/stores.js';
  import { getOneBank } from '$lib/firebase.js';
  import BankInfo from './components/BankInfo.svelte';
    import type { BankType, CreditCardType } from '$lib/types';

  let bank:BankType

  let list:Array<CreditCardType> = [];
  getOneBank(data.slug).then((result) => {
     bank = result;
     list = $cardList.filter((card) => (
      card.bank_id
      &&
      bank.id
      &&
      card.bank_id == bank.id
      )
      );
  });

</script>

<svelte:head>
    <title>CreditCardDB | {data.slug}</title>
    <meta name="description" content="{data.slug} on CreditCardDB">
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