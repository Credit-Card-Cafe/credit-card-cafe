<script lang="js">
  export let data;
  import CardStack from '../../../components/CardStack.svelte';
  import { cardList } from '$lib/stores.js';
  import BankInfo from './components/BankInfo.svelte';

  let list = $cardList.filter((card) => (
    Object.hasOwn(card, "bank")
    &&
    card.bank.toLowerCase() == data.slug.toLowerCase()
  ));
</script>

<svelte:head>
    <title>CreditCardDB | {data.slug}</title>
</svelte:head>

<div id="bank">
  <CardStack cards={list}></CardStack>
  <BankInfo bank={data.slug}></BankInfo>
</div>

<style>
 div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 }
</style>