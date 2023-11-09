<script>
    import { user } from "../lib/stores";
    import { updateUser } from "$lib/firebase";    
    export let id;

    let show = "";
    
    if ($user) {
        if (Object.hasOwn($user, "wallet") && $user.wallet.includes(id)) {
            show = "wallet"
        } else if (Object.hasOwn($user,"tracking") && $user.tracking.includes(id)) {
            show = "tracking"
        } else {
            show = "both"
        }
    }
    

    function addCardtoUser(field) {
        let value = [...$user[field], id];
        show = "updating"
        updateUser(field, value).then((data) => {
            show = field
            $user[field].push(id);
        });
    }

    function rmCardFromUser(field) {
        let value = $user[field].filter((e) => e != id);
        show = "updating"
        updateUser(field, value).then((data) => {
            show = "both"
        });
        $user[field] = $user[field].filter((cardId) => cardId != id);
    }
</script>


<div id="trackCard">
    {#if $user}
        {#if show == "both"}
            <button on:click={() => addCardtoUser("wallet")}>Add Card to Wallet</button>
            <button on:click={() => addCardtoUser("tracking")}>Track this card</button>
        {:else if show == 'updating'} 
            <div>Updating...</div>
        {:else}
            {#if show == "wallet"}
                <button on:click={() => rmCardFromUser("wallet")}>Remove Card from wallet</button>
            {:else if show == "tracking"}
                <button on:click={() => rmCardFromUser("tracking")}>Stop tracking this Card</button>
            {:else}
                <div>Something went wrong...</div>
            {/if}
        {/if}
    {:else}
        You can track this card or add it to your wallet by logging in.
    {/if}
</div>


<style>
    #trackCard {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>