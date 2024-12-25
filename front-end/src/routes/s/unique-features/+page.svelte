<script lang="ts">
    let section = "wallet";

    const sectionTitles:{[key:string]:string} = {
        "wallet": "Wallet",
        "tracking": "Tracking",
        "cards": "Cards",
        "table": "Table",
        "mycards": "My Cards"
    }

    const features:{[key:string]:string[]} = {
        "wallet": [
            "Our app helps you stay informed about your credit cards with the Wallet Feature. Add a card to your wallet for personalized recommendations, and compare rewards.",
            "Your wallet is designed for personalized recommendations. Based on cards you’ve added, we can suggest new cards popular with users who have similar wallets. This is great for finding cards you might not have considered.",
            "Adding a card to your wallet not only tracks it but also helps us recommend other cards you might like based on what other users have in their wallets.",
            "Occasionally, we may ask for feedback if you decide to remove a card. This helps ensure that our recommendations stay relevant and useful.",
            ], 
        "tracking": [
            "Tracking is for cards you’re interested in, even if you’re not ready to apply! Receive updates on changes, like reward offers or sign-up bonuses, and keep an eye on cards before deciding.",
            "We also highlight overlapping reward categories across cards in your wallet and tracked list, giving you a quick view of potential benefits.",
            "When you track a card, we’ll notify you about key changes, like new sign-up bonuses, reward updates, or bonus credits. This way, you can stay informed without having to check card details constantly."
        ],
        "cards": [
            "Every card has its own page. Click on any card from any page to view its rewards and information",
            "Explore key details of the credit card, such as rewards programs (cashback, points, miles), fees, and sign-up bonuses.",
            "From here, you can also manage the card, add to you wallet, track the card, and apply modifiers!"
        ],
        "table": [
            "All essential card information for your tracked cards and wallet will be displayed in a table format. You can easily switch to view only tracked cards, only wallet cards, or both, helping you quickly compare and review your card information.",
            "Use the toggle switch to customize your view, making it easier to keep track of the details most important to you.",
            "We offer many features to customize your table experience, like which properties you would like to view!"
        ],
        "mycards": [
            "Review your wallet and tracked cards from the 'My Cards' page. View insights to your wallet and tracked cards, such as rewards and annual fees.",
            "Switch between the Wallet and Tracking pages to accesss your rewards, and understand which card has the lowest APR.",
            "We also highlight overlapping reward categories across cards in your wallet and tracked list, giving you a quick view of potential benefits.",
        ]
    }

    let slideNumber = 0;

    const nextSection = () => {
        const titles = Object.keys(sectionTitles)
        section = titles[(titles.indexOf(section)+1)%titles.length]
        slideNumber = 0
    }
</script>
<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black pt-24 h-full">
    <nav class="w-full mb-12">
        <ul class="w-full rounded-lg bg-theme-lightgray dark:bg-theme-darkgray w-full flex flex-row justify-center gap-x-6 p-2 py-6">
            {#each Object.keys(sectionTitles) as title}
                <li><button on:click={() => {section = title; slideNumber = 0}} class="rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl {section == title ? "bg-theme-green text-theme-white hover:bg-theme-green-hov" : "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov"}">{sectionTitles[title]}</button></li>
            {/each}
        </ul>
    </nav>

    <section class="h-full relative pl-10">
        <h1 class="text-5xl lg:text-7xl font-bold text-theme-green">{sectionTitles[section]}</h1>
        {#key slideNumber}
            <p class="text-xl lg:text-3xl lg:w-3/4 font-semibold text-center lg:text-left my-10">{features[section][slideNumber%features[section].length]}</p>
        {/key}
        {#if slideNumber > 0}
        <button on:click={() => slideNumber--} class="bg-theme-blue hover:bg-theme-blue-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center absolute bottom-0 left-24">Back</button>
        {/if}
        {#if slideNumber < features[section].length-1}
        <button on:click={() => slideNumber++} class="bg-theme-blue hover:bg-theme-blue-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center absolute bottom-0 right-24">Next</button>
        {/if}
        {#if slideNumber == features[section].length-1}
        <button on:click={nextSection} class="bg-theme-green hover:bg-theme-green-hov my-4 lg:my-0 py-3 lg:py-4 lg:px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg font-semibold lg:text-xl items-center absolute bottom-0 right-24">Next Section</button>
        {/if}
    </section>

</main>
