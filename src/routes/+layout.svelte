<script lang="js">
    import { user, admin } from "$lib/stores";
    import LogInButton from "../components/LogInButton.svelte";
    import LogOutButton from "../components/LogOutButton.svelte";
    import { headerColor } from "$lib/stores";
  import SearchBar from "../components/SearchBar.svelte";

</script>

<div id="top" style={`background:${$headerColor}`}>
    <div id="start">
        <div id="title">CreditCardDB</div>
        <nav>
            <a href="/">Home</a>
            <a href="/search">Cards</a>
            {#if $user}
                <a href="/contribute">Contribute</a>
            {/if}
        </nav>
        <SearchBar></SearchBar>
    </div>
    <div id="end" class="flex">
        <a href="/account">Account</a>
        <button on:click={() => $admin = !$admin}>Admin Toggle ({$admin ? "On" : "Off"})</button>
        {#if $user}
            Loged in as {$user.displayName} <LogOutButton></LogOutButton>
        {:else}
            <LogInButton></LogInButton>
        {/if}
    </div>
</div>

<style>
#top {
    display: flex;
    flex-direction: row;
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
}
#start {
    display: flex;
    flex-direction: row;
}
a {
    text-decoration: none;
    color: black;
    margin: .5rem;
    padding: .70rem;
    font-size: 1rem;
}
a:hover {
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
}
:global(body) {
    margin: 0;
}
</style>

<slot />

