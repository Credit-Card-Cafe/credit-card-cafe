<script lang="ts">
    import { lists } from "$lib/fields";
    import { type RewardSet } from "$lib/types";
    export let category;
    export let categories: {[Key: string]:Array<RewardSet>};

    let context = true;

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

    categories[category].sort((a,b) => parseFloat(b.value) - parseFloat(a.value))
</script>

<button class="shadow-lg p-2 dark:border dark:border-theme-text-white font-medium rounded-lg mb-1 lg:mb-4 mx-auto flex flex-col" on:click={() => toggleContext()}>
    {lists.rewardCategories[category]}
    <span class={`my-1 flex flex-row items-center flex-wrap md:${context ? "inline" : "hidden"}`}>
        {#each categories[category] as reward}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:mouseenter={() => hoverCard(reward.card.card_url)} on:mouseleave={() => unHoverCard(reward.card.card_url)} class={
            reward.custom ? "dark:bg-white/[0.1] bg-black/[0.1] hovertip outline outline-theme-green m-2 rounded-md inline-flex flex-col items-center relative" 
                          : "hovertip m-2 rounded-md inline-flex flex-col items-center relative"}>
                <img class="h-8 w-12 rounded-[0.15rem]" style="background-color:{reward.card.card_color}" src="/storage/{reward.card.card_url}.jpeg" alt="{reward.card.card_name}">
                <span class="absolute -bottom-3 -right-2 font-semibold text-lg text-shadow">{reward.value}</span>
            </span>
        {/each}
    </span>
</button>

<style>
    .text-shadow {
        color: #262626;
        text-shadow:
    1px 1px 0 #f7fcf9,
    -1px 1px 0 #f7fcf9,
    -1px -1px 0 #f7fcf9,
    1px -1px 0 #f7fcf9;
    }
    @media (prefers-color-scheme: dark) {
        .text-shadow {
            color: #262626;
            text-shadow:
            1px 1px 0 #d6c0a5,
            -1px 1px 0 #d6c0a5,
            -1px -1px 0 #d6c0a5,
            1px -1px 0 #d6c0a5;
        }
    }
      
</style>