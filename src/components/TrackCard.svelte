<script lang="ts">
    import { user } from "../lib/stores";
    import { updateUser } from "$lib/firebase";    
    export let id: string;

    enum Fields {
        Wallet = "wallet",
        Tracking = "tracking"
    }

    let show: Fields | "updating" | "both";
    
    if ($user) {
        if ($user.wallet && $user.wallet.includes(id)) {
            show = Fields.Wallet
        } else if ($user.tracking && $user.tracking.includes(id)) {
            show = Fields.Tracking
        } else {
            show = "both"
        }
    }
    

    function addCardtoUser(field: Fields) {
        if ($user) {
            $user[field].push(id);
            show = "updating"
            updateUser(field, $user[field]).then((data) => {
                show = field
            });
        }
    }

    function rmCardFromUser(field: Fields) {
        if ($user) {
            let value = $user[field].filter((e) => e != id);
            show = "updating"
            updateUser(field, value).then((data) => {
                show = "both"
            });
            $user[field] = $user[field].filter((cardId) => cardId != id);
        }
    }
</script>


{#if $user}
    <div class="flex flex-row my-6 justify-center">
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