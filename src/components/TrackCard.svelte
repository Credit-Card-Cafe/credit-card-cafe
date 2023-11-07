<script>
    import { user } from "../lib/stores";
    import { updateUser, initUserData } from "$lib/firebase";
    
    export let id;

    let show = "";
    
    
    initUserData().then(() => {
        if ($user) {
            if (Object.hasOwn($user, "wallet") && $user.wallet.includes(id)) {
                show = "wallet"
            } else if (Object.hasOwn($user,"tracking") && $user.tracking.includes(id)) {
                show = "tracking"
            } else {
                show = "both"
            }
        }
    });
    

    function addCardtoUser(field) {
        let value = [...$user[field], id];
        show = "updating"
        updateUser(field, value).then((data) => {
            show = field
        });
    }

    function rmCardFromUser(field) {
        let value = $user[field].filter((e) => e != id);
        show = "updating"
        updateUser(field, value).then((data) => {
            show = "both"
        });
    }
</script>

{#if $user}
<div id="trackCard">
    {#if show == "both"}
        <button on:click={() => addCardtoUser("wallet")}>Add Card to Wallet</button>
        <button on:click={() => addCardtoUser("tracking")}>Track this card</button>
    {:else if show == 'updating'} 
        <div>Updating...</div>
    {:else}
        {#if show == "wallet"}
            <button on:click={() => rmCardFromUser("wallet")}>Remove Card from wallet</button>
        {/if}
        {#if show == "tracking"}
            <button on:click={() => rmCardFromUser("tracking")}>Stop tracking this Card</button>
        {/if}
    {/if}
</div>
{/if}

<style>
    #trackCard {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>