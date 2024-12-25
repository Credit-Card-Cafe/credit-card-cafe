<script lang="ts">
    import { get, writable } from "svelte/store";
    import { quiz } from "./quiz";
    import CardStack from "global-components/CardStack.svelte";
    import { type ModifiedCardObject } from "$lib/types";
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser, getCardsFromIDList } from "$lib/functions";
    import { getOneCardByURL } from "../../api/cards/cards";

    let localUser = convertJSONtoUser($localUserData)

    interface UserType {
        user_business: boolean,
        user_goal: string,
        user_descriptor: string,
        user_banks: Set<string>,
        user_creditscore: number,
        user_debt: number,
        user_income: number,
        user_creditchecks6month: number,
        user_cards: ModifiedCardObject[],
    }
    let userProfile:UserType = {
        user_business: false,
        user_goal: "",
        user_descriptor: "",
        user_banks: new Set(),
        user_creditscore: 0,
        user_debt: 0,
        user_income: 0,
        user_creditchecks6month: 0,
        user_cards: []
    }

    let question = 0

    let hasFetched = false;

    $: if (question > quiz.length-1 && !hasFetched) {
        if(localUser.wallet) {
            hasFetched = true;
            getCardsFromIDList(localUser.wallet).then((cards) => {
                cards && (userProfile.user_cards = cards)
                cards.forEach((card) => {
                    userProfile.user_banks.add(card.card_bank)
                })
            });
        }
    }

    const quizAnswers = writable<{ [key: number]: number | null }>({});
    quizAnswers.set(Object.fromEntries(quiz.map((_, index) => [index, null])));

    function hasRequirementsMet(reqs: string[]): boolean {
        if (reqs.length === 0) {
            return true; // No requirements, always allow
        }

        const groupedByQuestion: { [key: number]: number[] } = {};
        const answers = get(quizAnswers); // Access the current state of the store

        // Group requirements by question index
        for (const req of reqs) {
            const [questionIndex, answerIndex] = req.split('.').map(Number);
            if (!groupedByQuestion[questionIndex]) {
                groupedByQuestion[questionIndex] = [];
            }
            groupedByQuestion[questionIndex].push(answerIndex);
        }

        // Check that at least one condition is met for each distinct question
        for (const [questionIndex, answerIndexes] of Object.entries(groupedByQuestion)) {
            const questionKey = Number(questionIndex);
            const selectedAnswer = answers[questionKey];

            // Check if any answer from this question satisfies the condition
            if (!answerIndexes.some(index => selectedAnswer === index)) {
                return false; // If none of the answers from this question are satisfied, block
            }
        }

        return true; // All conditions are satisfied
    }

    let name = "";

    const addCard = () => {
        getOneCardByURL(name).then((card) => card && (userProfile.user_cards = [...userProfile.user_cards, card]));
        name = "";
    }
    const addBank = () => {
        userProfile.user_banks.add(name)
        userProfile.user_banks = new Set(userProfile.user_banks)
        name = "";
    }
</script>

<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col pb-4 pt-24 min-h-full">
    <h2 class="text-2xl lg:text-4xl font-bold text-center bg-theme-white dark:bg-theme-black dark:text-theme-text-white pt-4 pb-2 text-theme-black">Personalize my Reccomendations</h2>
    <section class="lg:pt-16 pb-4 flex flex-col items-center h-full">
        {#key question}
        {#if question < quiz.length}
            <div id="quiztitle" class="text-4xl lg:text-7xl font-bold text-theme-green text-center py-4">{quiz[question]?.title}</div>
            <div id="quizitems" class="flex flex-col lg:flex-row  gap-6 px-12 lg:px-48 flex-wrap justify-center">
            {#each quiz[question]?.prompts as prompt, index}
                {#if hasRequirementsMet(prompt.reqs)}
                    <button on:click={() => {quizAnswers.update(answers => ({ ...answers, [question]: index })); question++}} class="text-xl font-semibold hover:bg-theme-black/[0.1] dark:hover:bg-theme-white/[0.1] dark:text-theme-text-white border-2 {$quizAnswers[question] == index ? "border-theme-green" : "border-theme-text-white" } rounded-lg p-4">{prompt.prompt}</button>
                {/if}
            {/each}
            </div>
            {#if question == 2}
                <a href="/info/credit-score" class="bg-theme-yellow hover:bg-theme-yellow-hov mt-10 py-3 lg:py-4 lg:px-20 w-11/12 lg:w-fit justify-center text-theme-black dark:text-theme-black inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center lg:absolute bottom-16">Don't know?</a>
            {/if}
        {:else if question == quiz.length && $quizAnswers[0] != 1}
            <div id="quiztitle" class="text-2xl lg:text-5xl lg:text-6xl font-bold text-theme-green text-center pb-3 lg:w-1/2 lg:ml-12">Which Credit Cards do you already have?</div>
            <div id="quizitems" class="flex flex-col gap-6 flex-wrap items-center">
                <form on:submit|preventDefault={addCard}>
                    <div class="bg-theme-lightgray/65 dark:bg-theme-darkgray/45 border dark:border-theme-text-white rounded-lg mx-8 lg:mx-4 my-4 lg:my-0 p-2 flex flex-row items-center text-black dark:text-theme-text-white focus-within:outline-theme-blue focus-within:outline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 inline">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>              
                        <input class="border-none bg-transparent radius-0 focus:outline-none dark:placeholder:text-theme-text-white w-1/2 lg:w-full" type="search" bind:value={name} placeholder="Search Cards...">
                        <button class="block px-4 text-center hover:text-theme-text-black-hov transition-all flex flex-row items-center" on:click={() => addCard()}>Search 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>        
                        </button>
                    </div>
                </form>
                {#if userProfile.user_cards.length > 0}
                <button on:click={() => question++} class="text-xl font-semibold hover:bg-theme-black/[0.1] dark:hover:bg-theme-white/[0.1] dark:text-theme-text-white border-2 border-theme-text-white rounded-lg px-12 py-4">Next</button>
                {/if}
                <CardStack cards={userProfile.user_cards} showTrackCard={false} allowClick={false}></CardStack>
            </div>
        {:else if question == quiz.length + 1 && $quizAnswers[1] != 0 && $quizAnswers[0] != 1}
            <div id="quiztitle" class="text-2xl lg:text-5xl lg:text-6xl font-bold text-theme-green text-center pb-3 lg:w-1/2 lg:ml-12">At which banks do you have an account?</div>
            <div id="quizitems" class="flex flex-col gap-6 flex-wrap items-center">
                <form on:submit|preventDefault={addBank}>
                    <div class="bg-theme-lightgray/65 dark:bg-theme-darkgray/45 border dark:border-theme-text-white rounded-lg mx-8 lg:mx-4 my-4 lg:my-0 p-2 flex flex-row items-center text-black dark:text-theme-text-white focus-within:outline-theme-blue focus-within:outline">             
                        <input class="border-none bg-transparent radius-0 focus:outline-none dark:placeholder:text-theme-text-white w-1/2 lg:w-full" type="search" bind:value={name} placeholder="Find Banks...">
                        <button class="block px-4 text-center hover:text-theme-text-black-hov transition-all flex flex-row items-center" on:click={() => addBank()}>Add Bank 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline ml-2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>        
                        </button>
                    </div>
                </form>
                {#if userProfile.user_cards.length > 0}
                <button on:click={() => question++} class="text-xl font-semibold hover:bg-theme-black/[0.1] dark:hover:bg-theme-white/[0.1] dark:text-theme-text-white border-2 border-theme-text-white rounded-lg px-12 py-4">Next</button>
                {/if}
                <div class="shadow-xl rounded-lg p-4 flex flex-col gap-4">
                {#each userProfile.user_banks as bank}
                    <div class="text-xl border rounded-md py-4 px-8 flex flex-row gap-6 justify-between">
                        <span>{bank}</span>
                        <span class="text-theme-red font-bold cursor-pointer">x</span>
                    </div>
                {/each}
                </div>
            </div>
        {:else}
            The user has completed the quiz and is ready for their results. 
        {/if}
        {#if question > 0}
        <button on:click={() => {question--}} class="bg-theme-blue hover:bg-theme-blue-hov mt-10 lg:my-0 py-3 lg:py-4 lg:px-20 w-11/12 lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center lg:absolute bottom-16 left-24">Back</button>
        {/if}
        {/key}
    </section>
</main>

