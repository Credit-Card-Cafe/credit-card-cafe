<script lang="ts">
    import { lists } from "$lib/fields";
    import { type RewardSet } from "$lib/types";
    export let category;
    export let categories: {[Key: string]:Array<RewardSet>};

    let context = false;

    function hoverCard(cardURL: string) {
        let element = document.getElementById(cardURL)
        if (element && window.outerWidth > 1024) {
            element.classList.remove("mb-[-9rem]")
            element.classList.add("mb-12");
        }
    }

    function unHoverCard(cardURL: string) {
        let element = document.getElementById(cardURL)
        if (element) {
            element.classList.add("mb-[-9rem]")
            element.classList.remove("mb-12");
        }
    }

    function toggleContext() {
        context = !context
    }

    if (categories[category].length > 1) {
        context = true
    }

    categories[category].sort((a,b) => parseFloat(b.value) - parseFloat(a.value))
</script>

<button class="md:shadow-lg dark:border border-white-warm dark:border-2 p-1 md:p-2 rounded-lg mb-1 md:mb-4 mx-auto md:mx-1 flex flex-col md:w-auto w-11/12" on:click={() => toggleContext()}>
    {lists.rewardCategories[category]} ({categories[category].length})
    <span class={`my-2 flex flex-row justify-start flex-wrap md:${context ? "inline" : "hidden"}`}>
        {#each categories[category] as reward}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:mouseenter={() => hoverCard(reward.card.card_url)} on:mouseleave={() => unHoverCard(reward.card.card_url)} class={reward.custom ? "reward dark:bg-white/[0.1] bg-black/[0.1] hovertip outline outline-green-500" : "reward bg-black/[0.1] dark:bg-white/[0.1] hovertip"}>
                <span class="h-8 w-12 rounded-md mb-1" style="background:rgb({reward.card.card_color})"></span>
                {reward.value}
            </span>
        {/each}
    </span>
</button>

<style>
    .reward {
        @apply m-2 p-2 rounded-md inline-flex flex-col items-center relative;
    }
</style>