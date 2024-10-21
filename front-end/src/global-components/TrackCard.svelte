<script lang="ts">
    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";
    import { onMount } from "svelte";

    //import { updateUser } from "$lib/firebase";    
    export let id: string;

    $: localUser = convertJSONtoUser($localUserData);

    enum Fields {
        Wallet = "wallet",
        Tracking = "tracking"
    }

    let show: Fields | "updating" | "both";
    
    onMount(() => {
        if (localUser) {
        if (localUser.wallet && localUser.wallet.includes(id)) {
            show = Fields.Wallet
        } else if (localUser.tracking && localUser.tracking.includes(id)) {
            show = Fields.Tracking
        } else {
            show = "both"
        }
    }
    })
    

    function addCardtoUser(field: Fields) {
        if (localUser) {
            localUser[field].push(id);
            show = "updating"
            $localUserData = JSON.stringify(localUser)
            show = field
        }
    }

    function rmCardFromUser(field: Fields) {
        if (localUser) {
            let value = localUser[field].filter((e) => e != id);
            show = "updating"
            localUser[field] = localUser[field].filter((cardId) => cardId != id);
            $localUserData = JSON.stringify(localUser)
            show = "both"
        }
    }
</script>


{#if localUser}
    <div class="flex flex-row my-6 justify-center z-20">
        {#if show == "both"}
            <button on:click={() => addCardtoUser(Fields.Wallet)} class="btn mr-1 bg-theme-blue hover:bg-theme-blue-hov"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 inline">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              Add to Wallet</button>
            <button on:click={() => addCardtoUser(Fields.Tracking)} class="btn ml-1 bg-theme-blue hover:bg-theme-blue-hov"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 inline">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
              Track</button>
        {:else if show == 'updating'} 
            <div>Updating...</div>
        {:else}
            {#if show == Fields.Wallet}
                <button on:click={() => rmCardFromUser(Fields.Wallet)} class="btn bg-theme-red hover:bg-theme-red-hov">Remove Card from wallet</button>
            {:else if show == Fields.Tracking}
                <button on:click={() => rmCardFromUser(Fields.Tracking)} class="btn bg-theme-red hover:bg-theme-red-hov">Stop tracking this Card</button>
            {:else}
                <div>Loading...</div>
            {/if}
        {/if}
    </div>
{/if}

<style>
    .btn {
        @apply  text-white py-1 px-4 rounded-md transition-all text-sm;
    }

</style>