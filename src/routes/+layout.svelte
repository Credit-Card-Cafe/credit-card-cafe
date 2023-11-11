<script lang="js">
    import { user, admin } from "$lib/stores";
    import LogInButton from "../components/LogInButton.svelte";
    import { headerColor } from "$lib/stores";
    import SearchBar from "../components/SearchBar.svelte";
    import AccountActions from "../components/AccountActions.svelte";

</script>

<div id="top" style={`background:${$headerColor}`}>
    <div id="start">
        <div id="title">CreditCardDB</div>
        <nav>
            <a href="/">Home</a>
            <a href="/search">Cards</a>
            {#if $user}
                <a href="/contribute">Contribute</a>
                {#if $user.admin}
                    <a href="/submissions">Submissions</a>
                {/if}
            {/if}
        </nav>
        <SearchBar></SearchBar>
    </div>
    <div id="end" class="flex">
        {#if $user}
            <AccountActions></AccountActions>
        {:else}
            <LogInButton></LogInButton>
        {/if}
    </div>
</div>
{#if $admin}
    <div class="a">
        <pre>uid: {$user.uid}<br>displayName: {$user.displayName}<br>email: {$user.email}</pre>
    </div>
{/if}

<style>
    nav > * {
        display: none;
    }
    nav > :nth-last-child(n+3) {
        display: initial;
    }
    #top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        padding: 0.5rem 0;
    }
    #start {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    #title {
        display: none;
    }
    a {
        text-decoration: none;
        color: black;
        padding: .70rem;
        font-size: 1rem;
    }
    :global(body) {
        margin: 0;
    }
    nav {
        display: flex;
    }
@media (min-width: 768px) {
    #top {
        justify-content: space-between;
        justify-items: center;
        margin-bottom: 4rem;
        padding: 1rem 2rem;
    }
    #title, nav {
        display: inline;
    }
    #title {
        margin-right: 2rem;
        display: block;
    }
    a {
        margin: .5rem;
    }
    a:hover {
        background: rgba(0,0,0,0.1);
        border-radius: 5px;
    }
    .a {
        position: fixed;
        top: 2.5rem;
        right:2rem;
        background: white;
        padding: 0.5rem;
        border: 1px solid black;
    }
    nav > * {
        display: initial;
    }
}
</style>

<slot />

