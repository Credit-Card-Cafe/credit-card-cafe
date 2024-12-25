import { c as create_ssr_component, b as subscribe, e as escape, d as each, a as add_attribute, v as validate_component, g as get_store_value } from "../../../../chunks/ssr.js";
import { w as writable } from "../../../../chunks/index.js";
import { C as CardStack } from "../../../../chunks/CardStack.js";
import { c as convertJSONtoUser, g as getCardsFromIDList, l as localUserData } from "../../../../chunks/functions.js";
const quiz = [
  { title: "Who are we personalizing for?", prompts: [
    { reqs: [], prompt: "Me!" },
    { reqs: [], prompt: "My Business" }
  ] },
  { title: "I am a...", prompts: [
    { reqs: ["0.0"], prompt: "Beginner to Credit Cards" },
    { reqs: ["0.0"], prompt: "Student" },
    { reqs: ["0.0"], prompt: "Current Credit Card User" },
    { reqs: ["0.1"], prompt: "Small Business Decision Maker" },
    { reqs: ["0.1"], prompt: "Large Business Decision Maker" },
    { reqs: ["0.1"], prompt: "Employee" }
  ] },
  { title: "My Credit Score is...", prompts: [
    { reqs: [], prompt: "I don't have one" },
    { reqs: [], prompt: "300 - 579" },
    { reqs: [], prompt: "580 - 669" },
    { reqs: [], prompt: "670 - 739" },
    { reqs: [], prompt: "740 - 799" },
    { reqs: [], prompt: "800 - 850" },
    { reqs: ["1.4"], prompt: "Skip" }
  ] },
  { title: "My Financial Flexibility is...", prompts: [
    { reqs: [], prompt: "None" },
    { reqs: [], prompt: "Some" },
    { reqs: [], prompt: "Comfortable" },
    { reqs: [], prompt: "Very comfortable" }
  ] },
  { title: "I'm looking to...", prompts: [
    { reqs: ["0.0", "2.0", "2.1", "2.2"], prompt: "Build or improve my credit" },
    { reqs: ["2.2", "2.3", "3.1", "3.2", "3.3"], prompt: "Pay off existing credit card debt faster" },
    { reqs: ["2.3", "2.4", "2.5", "3.2", "3.3"], prompt: "Earn rewards on my everyday spending" },
    { reqs: ["0.0", "2.3", "2.4", "2.5", "3.2", "3.3"], prompt: "Save on travel expenses and perks" },
    { reqs: ["0.0", "2.4", "2.5", "3.2", "3.3"], prompt: "Access Premium Perks" },
    { reqs: ["0.1"], prompt: "Manage finances for my business" },
    { reqs: ["0.0", "2.4", "2.5", "3.3"], prompt: "Churn, Baby, Churn!" },
    { reqs: [], prompt: "Other/Not sure yet." }
  ] },
  { title: "My biggest expense is...", prompts: [
    { reqs: [], prompt: "Travel" },
    { reqs: [], prompt: "Dining" },
    { reqs: ["0.0"], prompt: "Groceries" },
    { reqs: [], prompt: "Gas / Transport" },
    { reqs: ["0.0"], prompt: "Shopping" },
    { reqs: ["0.1"], prompt: "Office needs" },
    { reqs: ["0.1"], prompt: "Large purchases" },
    { reqs: ["0.0"], prompt: "Covered by another card" },
    { reqs: [], prompt: "Other" }
  ] }
];
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $localUserData, $$unsubscribe_localUserData;
  let $quizAnswers, $$unsubscribe_quizAnswers;
  $$unsubscribe_localUserData = subscribe(localUserData, (value) => $localUserData = value);
  let localUser = convertJSONtoUser($localUserData);
  let userProfile = {
    user_business: false,
    user_goal: "",
    user_descriptor: "",
    user_banks: /* @__PURE__ */ new Set(),
    user_creditscore: 0,
    user_debt: 0,
    user_income: 0,
    user_creditchecks6month: 0,
    user_cards: []
  };
  let question = 0;
  let hasFetched = false;
  const quizAnswers = writable({});
  $$unsubscribe_quizAnswers = subscribe(quizAnswers, (value) => $quizAnswers = value);
  quizAnswers.set(Object.fromEntries(quiz.map((_, index) => [index, null])));
  function hasRequirementsMet(reqs) {
    if (reqs.length === 0) {
      return true;
    }
    const groupedByQuestion = {};
    const answers = get_store_value(quizAnswers);
    for (const req of reqs) {
      const [questionIndex, answerIndex] = req.split(".").map(Number);
      if (!groupedByQuestion[questionIndex]) {
        groupedByQuestion[questionIndex] = [];
      }
      groupedByQuestion[questionIndex].push(answerIndex);
    }
    for (const [questionIndex, answerIndexes] of Object.entries(groupedByQuestion)) {
      const questionKey = Number(questionIndex);
      const selectedAnswer = answers[questionKey];
      if (!answerIndexes.some((index) => selectedAnswer === index)) {
        return false;
      }
    }
    return true;
  }
  let name = "";
  {
    if (question > quiz.length - 1 && !hasFetched) {
      if (localUser.wallet) {
        hasFetched = true;
        getCardsFromIDList(localUser.wallet).then((cards) => {
          cards && (userProfile.user_cards = cards);
          cards.forEach((card) => {
            userProfile.user_banks.add(card.card_bank);
          });
        });
      }
    }
  }
  $$unsubscribe_localUserData();
  $$unsubscribe_quizAnswers();
  return `<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col pb-4 pt-24 min-h-full"><h2 class="text-2xl lg:text-4xl font-bold text-center bg-theme-white dark:bg-theme-black dark:text-theme-text-white pt-4 pb-2 text-theme-black" data-svelte-h="svelte-1xszqeg">Personalize my Reccomendations</h2> <section class="lg:pt-16 pb-4 flex flex-col items-center h-full">${question < quiz.length ? `<div id="quiztitle" class="text-4xl lg:text-7xl font-bold text-theme-green text-center py-4">${escape(quiz[question]?.title)}</div> <div id="quizitems" class="flex flex-col lg:flex-row gap-6 px-12 lg:px-48 flex-wrap justify-center">${each(quiz[question]?.prompts, (prompt, index) => {
    return `${hasRequirementsMet(prompt.reqs) ? `<button class="${"text-xl font-semibold hover:bg-theme-black/[0.1] dark:hover:bg-theme-white/[0.1] dark:text-theme-text-white border-2 " + escape(
      $quizAnswers[question] == index ? "border-theme-green" : "border-theme-text-white",
      true
    ) + " rounded-lg p-4"}">${escape(prompt.prompt)}</button>` : ``}`;
  })}</div> ${``}` : `${question == quiz.length && $quizAnswers[0] != 1 ? `<div id="quiztitle" class="text-2xl lg:text-5xl lg:text-6xl font-bold text-theme-green text-center pb-3 lg:w-1/2 lg:ml-12" data-svelte-h="svelte-34jfat">Which Credit Cards do you already have?</div> <div id="quizitems" class="flex flex-col gap-6 flex-wrap items-center"><form><div class="bg-theme-lightgray/65 dark:bg-theme-darkgray/45 border dark:border-theme-text-white rounded-lg mx-8 lg:mx-4 my-4 lg:my-0 p-2 flex flex-row items-center text-black dark:text-theme-text-white focus-within:outline-theme-blue focus-within:outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 inline"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg> <input class="border-none bg-transparent radius-0 focus:outline-none dark:placeholder:text-theme-text-white w-1/2 lg:w-full" type="search" placeholder="Search Cards..."${add_attribute("value", name, 0)}> <button class="block px-4 text-center hover:text-theme-text-black-hov transition-all flex flex-row items-center" data-svelte-h="svelte-1f76jak">Search 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg></button></div></form> ${userProfile.user_cards.length > 0 ? `<button class="text-xl font-semibold hover:bg-theme-black/[0.1] dark:hover:bg-theme-white/[0.1] dark:text-theme-text-white border-2 border-theme-text-white rounded-lg px-12 py-4" data-svelte-h="svelte-1ry3jbu">Next</button>` : ``} ${validate_component(CardStack, "CardStack").$$render(
    $$result,
    {
      cards: userProfile.user_cards,
      showTrackCard: false,
      allowClick: false
    },
    {},
    {}
  )}</div>` : `${question == quiz.length + 1 && $quizAnswers[1] != 0 && $quizAnswers[0] != 1 ? `<div id="quiztitle" class="text-2xl lg:text-5xl lg:text-6xl font-bold text-theme-green text-center pb-3 lg:w-1/2 lg:ml-12" data-svelte-h="svelte-466v0b">At which banks do you have an account?</div> <div id="quizitems" class="flex flex-col gap-6 flex-wrap items-center"><form><div class="bg-theme-lightgray/65 dark:bg-theme-darkgray/45 border dark:border-theme-text-white rounded-lg mx-8 lg:mx-4 my-4 lg:my-0 p-2 flex flex-row items-center text-black dark:text-theme-text-white focus-within:outline-theme-blue focus-within:outline"><input class="border-none bg-transparent radius-0 focus:outline-none dark:placeholder:text-theme-text-white w-1/2 lg:w-full" type="search" placeholder="Find Banks..."${add_attribute("value", name, 0)}> <button class="block px-4 text-center hover:text-theme-text-black-hov transition-all flex flex-row items-center" data-svelte-h="svelte-h0eafz">Add Bank 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2"><path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg></button></div></form> ${userProfile.user_cards.length > 0 ? `<button class="text-xl font-semibold hover:bg-theme-black/[0.1] dark:hover:bg-theme-white/[0.1] dark:text-theme-text-white border-2 border-theme-text-white rounded-lg px-12 py-4" data-svelte-h="svelte-1ry3jbu">Next</button>` : ``} <div class="shadow-xl rounded-lg p-4 flex flex-col gap-4">${each(userProfile.user_banks, (bank) => {
    return `<div class="text-xl border rounded-md py-4 px-8 flex flex-row gap-6 justify-between"><span>${escape(bank)}</span> <span class="text-theme-red font-bold cursor-pointer" data-svelte-h="svelte-rom4ph">x</span> </div>`;
  })}</div></div>` : `The user has completed the quiz and is ready for their results.`}`}`} ${``}</section></main>`;
});
export {
  Page as default
};
