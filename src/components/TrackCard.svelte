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
            <button on:click={() => addCardtoUser(Fields.Wallet)} class="btn ml-1 bg-green-500 hover:bg-green-600">Add Card to Wallet</button>
            <button on:click={() => addCardtoUser(Fields.Tracking)} class="btn ml-1 bg-green-500 hover:bg-green-600">Track this card</button>
        {:else if show == 'updating'} 
            <div>Updating...</div>
        {:else}
            {#if show == Fields.Wallet}
                <button on:click={() => rmCardFromUser(Fields.Wallet)} class="btn bg-red-300 hover:bg-red-400">Remove Card from wallet</button>
            {:else if show == Fields.Tracking}
                <button on:click={() => rmCardFromUser(Fields.Tracking)} class="btn bg-red-300 hover:bg-red-400">Stop tracking this Card</button>
            {:else}
                <div>Something went wrong...</div>
            {/if}
        {/if}
    </div>
{/if}

<style>
    .btn {
        @apply  text-white py-1 px-4 rounded-2xl transition-all text-sm;
    }

</style>