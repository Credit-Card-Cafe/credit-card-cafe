<script lang="ts">
  import CreditCard from 'global-components/CreditCard.svelte';
  export let data;
  import CardInfo from './CardInfo.svelte';
  import { localUserData } from '$lib/stores';
  import { applyModifier, convertJSONtoUser, injectBankToCard, injectBrandToCard, parseDatabaseString } from '$lib/functions';
    import CardName from 'global-components/CardName.svelte';
    import { COP } from '$lib/types';
    import CardSettings from './components/CardSettings.svelte';

  let card = data.card;
  let localUser = convertJSONtoUser($localUserData)
  
  if (card) {
    card = applyModifier(card, localUser)
    injectBankToCard(card).then((cardWithBank) => {
      card = cardWithBank
    })
    if (card.card_brand) {
      injectBrandToCard(card).then((cardWithBrand) => {
        card = cardWithBrand
      })
    }
  }

</script>

<svelte:head>
    {#if card}
    <title>Credit Card Cafe | {card.card_bank} - {card.card_name}</title>
    <meta name="description" content="{card.card_bank} - {card.card_name} on CreditCardDB">
    <meta name="image" content="{'images/' + card.card_id + '.png'}">
    {/if}
</svelte:head>

{#if card}
<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black">
  <section class="flex flex-col lg:flex-row lg:pt-20">
  <div class="lg:w-1/2 px-8 flex flex-col justify-between">
    <div id="info">
      <CardName card={card}></CardName>
      <span class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-theme-green"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>           
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-theme-green"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>           
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-theme-green"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>           
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-theme-green"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>           
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-theme-green"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>           
      </span>
    </div>
    <div id="applyNow" class="mb-20 h-[15vh] lg:mb-0 lg:h-full flex items-center">
      <a href={card.card_link} target="_blank" class="bg-theme-blue hover:bg-theme-blue-hov py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg text-xl font-semibold items-center">
        Apply Now 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 ml-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </div>
  </div>
  <div class="lg:w-1/2 shadow-all-xl dark:shadow-theme-shadow-dark lg:rounded-l-2xl flex flex-col items-center">
      <div class="mt-[-4rem]"><CreditCard card={card} --color="{card.card_color}" showTrackCard={true}></CreditCard></div>
      <table class="table-auto mx-8 lg:mx-16 mb-8">
        <tr class="font-bold text-2xl">
            <td class="w-1/4">{parseDatabaseString(card, COP.card_af)}</td>
            <td class="w-1/4">{parseDatabaseString(card, COP.card_apr)}</td>
        </tr>
        <tr class="text-xl font-light">
            <td class="pb-4">Annual Fee</td>
            <td class="pb-4">APR</td>
        </tr>
        <tr class="font-bold text-2xl">
            <td>{parseDatabaseString(card, COP.card_network)}</td>
            <td>{parseDatabaseString(card, COP.card_type)}</td>
        </tr>
        <tr class="text-xl font-light">
            <td>Network</td>
            <td>Card Type</td>
        </tr>
    </table>
  </div>
  </section>
  <section class="mt-20">
      <CardInfo card={card}></CardInfo>
  </section>
  <section class="mt-20">
    <CardSettings></CardSettings>
  </section>
  <section>
    Last Update: {card.card_meta_lastupdate?.toLocaleString}
  </section>
</main>
{/if}
