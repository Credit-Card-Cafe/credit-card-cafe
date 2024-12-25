import { c as create_ssr_component, e as escape, d as each } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const features = [
    {
      title: "Why Is Your Credit Score Important?",
      sections: [
        "Your credit score impacts your ability to get approved for loans, credit cards, and even renting an apartment. Knowing your score helps you make informed financial decisions."
      ]
    },
    {
      title: "Where to Check Your Credit Score for Free",
      sections: [
        "Credit Karma - Offers free credit score monitoring and personalized financial advice.",
        "Experian - Provides a free FICO® Score and insights into your credit profile.",
        "Your Bank or Credit Card Provider - Many banks and credit card issuers now provide free credit scores as part of their online banking services."
      ]
    },
    {
      title: "Steps to Check Your Credit Score",
      sections: [
        "1. Choose one of the services below and sign up for a free account.",
        "2. Provide basic personal information, such as your name, address, and Social Security number (for identity verification).",
        "3. Review your credit score and report details to understand your current financial standing."
      ]
    },
    {
      title: "What If I Don’t Know My Score?",
      sections: [
        "If you don’t know your score, don’t worry! Start by using one of the free services below. Many tools will guide you through understanding your score and how to improve it if needed."
      ]
    }
  ];
  let slideNumber = 0;
  return `<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col px-12 py-24 h-full relative"><section class="h-full relative pl-10"><h1 class="text-5xl lg:text-7xl font-bold text-theme-green py-10" data-svelte-h="svelte-up81rs">Check Your Credit Score for Free</h1> <h2 class="text-xl lg:text-4xl font-semibold pb-10">${escape(features[slideNumber].title)}</h2> ${each(features[slideNumber].sections, (section) => {
    return `<p class="text-lg lg:text-xl font-semibold my-2">${escape(section)}</p>`;
  })} ${``} <a href="https://www.creditkarma.com/" target="_blank" class="rounded-lg absolute bottom-0 left-[25%] px-4 py-1" data-svelte-h="svelte-1hpgq5t"><img src="https://creditkarmacdn-a.akamaihd.net/res/content/bundles/assets/1.151.100/navi/CK-trademark.svg?auto=compress%2Cformat&amp;dpr=2" alt="Credit Karma" class="h-12"></a> <a href="https://www.experian.com" target="_blank" class="rounded-lg absolute bottom-0 left-[60%] px-4 py-1" data-svelte-h="svelte-1fg3mri"><img src="https://www.experian.com/static/shared/logos/logo-experian.svg" alt="Credit Karma" class="h-12"></a> ${slideNumber < features.length - 1 ? `<button class="bg-theme-blue hover:bg-theme-blue-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center absolute bottom-0 right-10" data-svelte-h="svelte-1olru00">Next</button>` : ``}</section></main>`;
});
export {
  Page as default
};
