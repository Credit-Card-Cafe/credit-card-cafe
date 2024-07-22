<script lang="ts">
    import { lists } from "$lib/fields";
    import { type RewardSet } from "$lib/types";
    export let category;
    export let categories: {[Key: string]:Array<RewardSet>};

    let context = false;

    function toggleContext() {
        context = !context
    }

    if (categories[category].length > 1) {
        context = true
    }

    categories[category].sort((a,b) => parseFloat(b.value) - parseFloat(a.value))
</script>

<button class="md:shadow-lg dark:border dark:border-white-warm p-1 md:p-2 rounded-lg mb-1 md:mb-4 mx-auto md:mx-1 flex flex-col md:w-auto w-11/12" on:click={() => toggleContext()}>
    {lists.rewardCategories[category]} ({categories[category].length})
    <span class={`my-2 flex flex-row justify-start flex-wrap md:${context ? "inline" : "hidden"}`}>
        {#each categories[category] as reward}
            <span class={reward.custom ? "reward dark:bg-white/[0.1] bg-black/[0.1] hovertip outline outline-green-500" : "reward bg-black/[0.1] dark:bg-white/[0.1] hovertip"}>
                <span class="h-8 w-12 rounded-md mb-1" style="background:rgb({reward.card.color})"></span>
                <span class="hovertext border border-white-warm rounded-md p-2 absolute bottom-full z-10 dark:bg-main-gray bg-alt dark:text-white-warm text-center">{reward.card.bank} - {reward.card.name}</span>
                {reward.value}
            </span>
        {/each}
    </span>
</button>

<style>
    .reward {
        @apply m-2 p-2 rounded-md inline-flex flex-col items-center relative;
    }

    .hovertip .hovertext {
      visibility: hidden;
    }
    
    .hovertip:hover .hovertext {
      visibility: visible;
    }
</style>